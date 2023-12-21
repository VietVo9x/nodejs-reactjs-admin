import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Modal,
  NativeSelect,
  TextField,
} from "@mui/material";

import { ToastContainer, toast } from "react-toastify";
import SendIcon from "@mui/icons-material/Send";
import { CategoryServices } from "./category.service";
import { Category_Res } from "../../types/reponse.type";
import { Err_Req_Category } from "../../types/error.request";
import { useEffect, useState } from "react";
import { Res_Error } from "../../types/error.response";
interface Props {
  onShowFormUpdate: Function;
  openFormUpdate: boolean;
  onCloseFormUpdate: Function;
  category: Category_Res | undefined;
  errorForm: Err_Req_Category;
  setErrorForm: Function;
  flag: boolean;
  setFlag: Function;
}
export default function UpdateCategory(props: Props) {
  const [updateCategory, setUpdateCategory] = useState({
    id: 0,
    name: "",
    description: "",
  });

  useEffect(() => {
    if (props.category) {
      setUpdateCategory({
        id: props.category.id,
        name: props.category.name,
        description: props.category.description,
      });
    }
  }, [props.category]);
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
    const name = e.target.name;
    const value = e.target.value;
    setUpdateCategory({ ...updateCategory, [name]: value });
  };
  const handleCloseForm = () => {
    props.onCloseFormUpdate("update");
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const validator = categoryService.validate(updateCategory);
      props.setErrorForm(validator);
      if (validator.isError) return;
      await categoryService.updateCategory(updateCategory.id, updateCategory);
      toast.success("Update Category Success", { autoClose: 1000 });
      props.onCloseFormUpdate("update");
      props.setFlag(!props.flag);
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
      <Modal
        open={props.openFormUpdate}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box component="form" noValidate sx={{ mt: 1, width: "100%" }}>
            <TextField
              margin="normal"
              required
              type="text"
              name="name"
              label="Category Name"
              fullWidth
              value={updateCategory.name}
              onChange={handleChange}
              error={Boolean(props.errorForm.msgCategoryName)}
              helperText={props.errorForm.msgCategoryName}
            />

            <TextField
              multiline
              minRows={6}
              maxRows={6}
              margin="normal"
              required
              id="description"
              type="text"
              label="Description"
              name="description"
              fullWidth
              value={updateCategory.description}
              onChange={handleChange}
              error={Boolean(props.errorForm.msgDescription)}
              helperText={props.errorForm.msgDescription}
            />
            {/* <Box sx={{ minWidth: 120, marginTop: 5, marginBottom: 5 }}>
              <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  Status
                </InputLabel>
                <NativeSelect
                  defaultValue={`${updateCategory.status}`}
                  inputProps={{
                    name: "age",
                    id: "uncontrolled-native",
                  }}
                >
                  <option value={"false"}>Block</option>
                  <option value={"true"}>Active</option>
                </NativeSelect>
              </FormControl>
            </Box> */}

            <Box display={"flex"} justifyContent={"space-between"}>
              <Button
                variant="contained"
                type="button"
                startIcon={<SendIcon />}
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                type="button"
                startIcon={<SendIcon />}
                sx={{ mt: 3, mb: 2 }}
                onClick={handleCloseForm}
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
