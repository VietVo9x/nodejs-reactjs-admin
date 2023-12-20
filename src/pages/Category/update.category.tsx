import { Box, Button, Modal, TextField } from "@mui/material";
import React from "react";
import { ToastContainer } from "react-toastify";
import SendIcon from "@mui/icons-material/Send";
import { CategoryServices } from "./category.service";

export default function UpdateCategory() {
 const categoryService = new CategoryServices();
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
    
  };
  const handleCloseFormCreate = () => {
  
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();

   
  };
  return (
    <div>
      <ToastContainer />
      <Modal
        open={false}
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
            //   value={props.newCategory.category_name}
            //   onChange={handleChange}
            //   error={Boolean(props.errorForm.msgCategoryName)}
            //   helperText={props.errorForm.msgCategoryName}
            />

            <TextField
              multiline
              minRows={5}
              maxRows={10}
              margin="normal"
              required
              id="description"
              type="text"
              label="Description"
              name="description"
              fullWidth
            //   value={props.newCategory.description}
            //   onChange={handleChange}
            //   error={Boolean(props.errorForm.msgDescription)}
            //   helperText={props.errorForm.msgDescription}
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

}
