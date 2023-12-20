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
} from "@mui/material/";

import Stack from "@mui/material/Stack";
import { Category_Res } from "../../types/reponse.type";
import { getData } from "../../apis/api.service";
import { CategoryServices } from "./category.service";
import { ToastContainer, toast } from "react-toastify";
import { Err_Req_Category } from "../../types/error.request";
import { _CATEGORY } from "../../apis";
import CreateCategory from "./create.category";
import { useFormStatus } from "../../utils/function.custom";
import { F_Category } from "../../types/form.type";
import ViewCategory from "./view.category";
import { Res_Error } from "../../types/error.response";
import { perPage } from "../../utils/constants";
import { useSearchParams } from "react-router-dom";
import CustomizedInputBase from "../../components/InputSearch";

export default function Category() {
  const { openFormView, openFormCreate, handleShowForm, handleClose } = useFormStatus();
  const [flag, setFlag] = useState(false);
  const [count, setCount] = useState(0);
  const [categorys, setCategorys] = useState<Category_Res[]>([]);
  const [category, setCategory] = useState<Category_Res | undefined>();
  const [age, setAge] = React.useState("");
  const [errorForm, setErrorForm] = useState<Err_Req_Category>({
    isError: false,
    msgCategoryName: "",
    msgDescription: "",
  });
  const [newCategory, setNewCategory] = useState<F_Category>({
    category_name: "",
    description: "",
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState<string>("");
  const page = Number(searchParams.get("page")) || 1;

  const params = React.useRef<{ [key: string]: any }>({ limit: 10 });
  console.log(params);
  React.useEffect(() => {
    // console.log(searchParams);

    searchParams.forEach((value, key) => {
      params.current[key] = value;
    });
    console.log(1111, params);
    getData(_CATEGORY, params.current).then((res: any) => {
      setCategorys(res.data.categories);
      setCount(Math.ceil(res.data.total / perPage));
    });
  }, [searchParams, flag]);

  const categoryServices = new CategoryServices(); //service

  //delete
  const handleDeleteCategory = async (id: number) => {
    try {
      const conf = window.confirm("Are you sure you want to delete");
      if (!conf) return;
      await categoryServices.deleteCategory(id);
      toast.success("Delete Category Success", { autoClose: 1000 });
      setFlag(!flag);
    } catch (error) {
      const newErr = error as Res_Error;
      toast.error(newErr.message, {
        autoClose: 1000,
      });
    }
  };
  //edit
  const handleEditCategory = async (element: Category_Res) => {};

  //thay doi trang
  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setSearchParams({ ...params.current, page: value.toString() });
  };
  //tim kiem
  const handleSearch = () => {
    setSearchParams({ ...params.current, search: searchValue, page: "1" });
  };
  const clearSearch = () => {
    setSearchParams({ ...params.current, search: "" });
    setSearchValue("");
  };

  //sort
  const handleChangeSelect: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    setAge(event.target.value);
  };

  //show modal
  const handleShowFormView = (element: Category_Res) => {
    handleShowForm("view");
    setCategory(element);
  };

  return (
    <div>
      <ToastContainer />

      <Box
        m={5}
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
        <Box sx={{ minWidth: 150 }}>
          <FormControl fullWidth>
            <NativeSelect
              defaultValue={age}
              inputProps={{
                name: "age",
                id: "uncontrolled-native",
              }}
              onChange={handleChangeSelect}
            >
              <option value={""}>Sort</option>
              <option value={1}>Name (A - Z)</option>
              <option value={2}>Name (Z - A)</option>
              <option value={3}>Price(Lowest)</option>
              <option value={4}>Thirty(Highest)</option>
            </NativeSelect>
          </FormControl>
        </Box>
      </Box>
      {categorys.length == 0 ? (
        <div>
          <h1>khong co gi</h1>
        </div>
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

                      <TableCell align="center">{element.status ? "Active" : "Inactive"}</TableCell>
                      <TableCell align="center">{element.description}</TableCell>

                      <TableCell align="center">
                        <Button
                          variant="contained"
                          color="inherit"
                          sx={{ marginRight: "10px" }}
                          onClick={() => handleShowFormView(element)}
                        >
                          <RemoveRedEyeIcon />
                        </Button>

                        <Button
                          variant="contained"
                          color={element.status ? "primary" : "secondary"}
                          sx={{ marginRight: "10px" }}
                          startIcon={<EditIcon />}
                          onClick={() => handleEditCategory(element)}
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
        onShowFormCreate={handleShowFormView}
        onCloseForm={handleClose}
        errorForm={errorForm}
        setErrorForm={setErrorForm}
        newCategory={newCategory}
        setNewCategory={setNewCategory}
        openFormCreate={openFormCreate}
      />
      <ViewCategory
        category={category}
        setCategory={setCategory}
        onShowFormView={handleShowForm}
        onCloseForm={handleClose}
        openFormCreate={openFormView}
      />
    </div>
  );
}
