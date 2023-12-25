import * as React from "react";
import { useEffect, useState } from "react";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import AddIcon from "@mui/icons-material/Add";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Button,
  Pagination,
  FormControl,
  NativeSelect,
  Switch,
} from "@mui/material/";

import Stack from "@mui/material/Stack";
import { Category_Res } from "../../types/reponse.type";
import { getData } from "../../apis/api.service";
import { CategoryServices } from "./category.service";
import { ToastContainer, toast } from "react-toastify";
import { Err_Req_Category } from "../../types/error.request";
import { _CATEGORY } from "../../apis";
import CreateCategory from "./create.category";
import { useFormStatus } from "../../utils/customhooks/function.custom";
import { F_Category } from "../../types/form.type";
import { Res_Error } from "../../types/error.response";
import { perPage } from "../../utils/constants";
import { useSearchParams } from "react-router-dom";
import CustomizedInputBase from "../../components/InputSearch";
import UpdateCategory from "./update.category";
import Empty from "../../components/Empty";

export default function Category() {
  const { openFormUpdate, openFormCreate, handleShowForm, handleClose } = useFormStatus();
  const [flag, setFlag] = useState(false);
  const [count, setCount] = useState(0);
  const [categorys, setCategorys] = useState<Category_Res[]>([]);
  const [category, setCategory] = useState<Category_Res>();
  const [age, setAge] = React.useState("");
  const [errorForm, setErrorForm] = useState<Err_Req_Category>({
    isError: false,
    msgCategoryName: "",
    msgDescription: "",
  });
  const [newCategory, setNewCategory] = useState<F_Category>({
    name: "",
    description: "",
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState<string>("");
  const page = Number(searchParams.get("page")) || 1;

  const params = React.useRef<{ [key: string]: any }>({ limit: 10 });

  React.useEffect(() => {
    searchParams.forEach((value, key) => {
      params.current[key] = value;
    });
    getData(_CATEGORY, params.current).then((res: any) => {
      setCategorys(res.categories);
      setCount(Math.ceil(res.total / perPage));
    });
  }, [searchParams, flag]);

  const categoryServices = new CategoryServices(); //service

  //delete
  const handleDeleteCategory = async (id: number) => {
    try {
      const conf = window.confirm("Are you sure you want to delete");
      if (!conf) return;
      const sorfDelete = {
        isDelete: "true",
      };
      await categoryServices.softDelete(id, sorfDelete);
      toast.success("Delete Category Success", { autoClose: 1000 });
      setFlag(!flag);
    } catch (error) {
      const newErr = error as Res_Error;
      toast.error(newErr.message, {
        autoClose: 1000,
      });
    }
  };

  //thay doi trang
  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setSearchParams({ ...params.current, page: value.toString() });
  };
  //tim kiem
  const handleSearch = () => {
    setSearchParams({ ...params.current, search_name: searchValue, page: "1" });
  };
  const clearSearch = () => {
    setSearchParams({ ...params.current, search_name: "" });
    setSearchValue("");
  };

  //sort
  const handleChangeSelect: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    setAge(event.target.value);
  };

  //edit
  const handleShowFormUpdate = async (element: Category_Res) => {
    handleShowForm("update");
    setCategory(element);
  };
  //block
  const handleChange = async (element: Category_Res) => {
    try {
      const updateStatus = {
        status: "true",
      };
      if (element.status) {
        updateStatus.status = "false";
      } else {
        updateStatus.status = "true";
      }
      await categoryServices.blockCategory(element.id, updateStatus);
      setFlag(!flag);
    } catch (error) {
      const newError = error as Res_Error;

      if (Array.isArray(newError.message)) {
        const errorMessage = newError.message.join(", ");

        toast.error(errorMessage, {
          autoClose: 1000,
        });
      }
      toast.error(newError.message, {
        autoClose: 1000,
      });
    }
  };

  return (
    <div>
      <ToastContainer />

      <Box
        component={"div"}
        mt={3}
        mb={5}
        pr={5}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <CustomizedInputBase
          setSearchValue={setSearchValue}
          onSearch={handleSearch}
          searchValue={searchValue}
          onClearSearch={clearSearch}
        />
        <Button
          variant="contained"
          sx={{ marginRight: "10px" }}
          onClick={() => handleShowForm("create")}
          startIcon={<AddIcon />}
        >
          New Category
        </Button>
      </Box>
      {categorys.length == 0 ? (
        <Empty title="Category Empty" />
      ) : (
        <>
          {/* table  */}

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Index</TableCell>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Description</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categorys &&
                  categorys.map((element, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="center">{element.name}</TableCell>

                      <TableCell align="center">
                        <Switch
                          checked={element.status}
                          onChange={() => handleChange(element)}
                          inputProps={{ "aria-label": "controlled" }}
                        />
                      </TableCell>
                      <TableCell align="center">{element.description}</TableCell>

                      <TableCell align="center">
                        <Button
                          variant="contained"
                          color={"primary"}
                          sx={{ marginRight: "10px" }}
                          startIcon={<EditIcon />}
                          onClick={() => handleShowFormUpdate(element)}
                        >
                          Edit
                        </Button>

                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleDeleteCategory(element.id)}
                        >
                          <DeleteIcon />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          {/* phan trang */}
          <Stack spacing={2} sx={{ padding: "15px 0" }}>
            <Pagination count={count} page={page} onChange={handleChangePage} color="primary" />
          </Stack>
        </>
      )}
      {/* modal */}
      <CreateCategory
        onShowFormCreate={handleShowForm}
        onCloseForm={handleClose}
        errorForm={errorForm}
        setErrorForm={setErrorForm}
        newCategory={newCategory}
        setNewCategory={setNewCategory}
        openFormCreate={openFormCreate}
        flag={flag}
        setFlag={setFlag}
      />
      <UpdateCategory
        errorForm={errorForm}
        onShowFormUpdate={handleShowForm}
        openFormUpdate={openFormUpdate}
        onCloseFormUpdate={handleClose}
        category={category}
        setErrorForm={setErrorForm}
        flag={flag}
        setFlag={setFlag}
      />
    </div>
  );
}
