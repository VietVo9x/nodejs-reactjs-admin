import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import React from "react";
import SendIcon from "@mui/icons-material/Send";
import { ToastContainer } from "react-toastify";
import { Err_Req_Category } from "../../types/error.request";
import { F_Category } from "../../types/form.type";

interface Props {
  openFormCreate: boolean;
  onShowFormView: Function;
  onCloseForm: Function;
  errorForm: Err_Req_Category;
  setErrorForm: Function;
  newCategory: F_Category;
  setNewCategory: Function;
}
export default function CreateCategory(props: Props) {
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };
  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    props.setNewCategory({ ...props.newCategory, [name]: value });
  };
  const handleCloseFormCreate = () => {
    props.onCloseForm("create");
    props.setNewCategory({
      category_name: "",
      description: "",
    });
    props.setErrorForm({
      isError: false,
      msgCategoryName: "",
      msgDescription: "",
    });
  };
  const handleSubmit = () => {};
  return (
    <div>
      <ToastContainer />
      <Modal
        open={props.openFormCreate}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box component="form" noValidate sx={{ mt: 1, width: "100%" }}>
            <TextField
              margin="normal"
              required
              type="text"
              name="category_name"
              label="Category Name"
              fullWidth
              value={props.newCategory.category_name}
              onChange={handleChange}
              error={Boolean(props.errorForm.msgCategoryName)}
              helperText={props.errorForm.msgCategoryName}
            />
            <TextField
              margin="normal"
              required
              id="description"
              type="text"
              label="Description"
              name="description"
              fullWidth
              value={props.newCategory.description}
              onChange={handleChange}
              error={Boolean(props.errorForm.msgDescription)}
              helperText={props.errorForm.msgDescription}
            />
            <Box display={"flex"} justifyContent={"space-between"}>
              <Button
                variant="contained"
                type="button"
                startIcon={<SendIcon />}
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit}
              >
                Create
              </Button>
              <Button
                variant="contained"
                type="button"
                startIcon={<SendIcon />}
                sx={{ mt: 3, mb: 2 }}
                onClick={handleCloseFormCreate}
              >
                Close
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
