import * as React from "react";
import { useEffect, useState } from "react";

import Select, { SelectChangeEvent } from "@mui/material/Select";
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
  Modal,
  Box,
  TextField,
  Typography,
  Button,
  Pagination,
} from "@mui/material/";

import Stack from "@mui/material/Stack";
import { Res_Category } from "../../types/reponse.type";
import { getData } from "../../apis/api.service";
import { CategoryServices } from "./category.service";
import { ToastContainer, toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import { Err_Req_Category } from "../../types/error.request";
import { _CATEGORY } from "../../apis";
import CreateCategory from "./create.category";
import { useFormStatus } from "../../utils/function.custom";
import { F_Category } from "../../types/form.type";

export default function Category() {
  const { openFormView, openFormCreate, handleShowForm, handleClose } = useFormStatus();
  const [categorys, setCategorys] = useState<Res_Category[]>([]);
  const [category, setCategory] = useState<Res_Category | undefined>();
  const [errorForm, setErrorForm] = useState<Err_Req_Category>({
    isError: false,
    msgCategoryName: "",
    msgDescription: "",
  });
  const [newCategory, setNewCategory] = useState<F_Category>({
    category_name: "",
    description: "",
  });

  const categoryServices = new CategoryServices(); //service

  useEffect(() => {
    getData(_CATEGORY)
      .then((res) => {
        if (res) setCategorys(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  //delete
  const handleDeleteCategory = async (id: number) => {
    const conf = window.confirm("Are you sure you want to delete");
    if (!conf) return;

    toast.success("Delete category successfully", { autoClose: 1000 });
    getData("categorys").then((res) => {
      setCategorys(res?.data);
    });
  };
  //edit
  const handleEditCategory = (id: number) => {};

  //show modal
  const handleShowFormView = (element: Res_Category) => {
    handleShowForm("view");
    setCategory(element);
  };

  return (
    <div>
      <ToastContainer />

      <Box m={5}>
        <Button
          variant="contained"
          sx={{ marginRight: "10px" }}
          onClick={() => handleShowForm("create")}
          startIcon={<AddIcon />}
        >
          New Category
        </Button>
      </Box>
      {/* table  */}

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Index</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categorys &&
              categorys.map((element, index) => (
                <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell scope="row">{element.category_name}</TableCell>

                  <TableCell align="center">{element.status ? "Active" : "Inactive"}</TableCell>
                  <TableCell align="center">
                    <Typography
                      component={"span"}
                      sx={{
                        display: "-webkit-box",
                        maxWidth: "200px",
                        WebkitLineClamp: "2",
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {" "}
                      {element.description}
                    </Typography>
                  </TableCell>

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
                      onClick={() => handleEditCategory(element.id)}
                    >
                      {!element.status ? "Acive" : "Disabled"}
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
        <Pagination count={1} page={1} color="primary" />
      </Stack>
      {/* modal */}
      <CreateCategory
        onShowFormView={handleShowFormView}
        onCloseForm={handleClose}
        errorForm={errorForm}
        setErrorForm={setErrorForm}
        newCategory={newCategory}
        setNewCategory={setNewCategory}
        openFormCreate={openFormCreate}
      />
    </div>
  );
}