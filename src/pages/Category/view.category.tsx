import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import { ToastContainer } from "react-toastify";
import { Category_Res } from "../../types/reponse.type";

interface Props {
  openFormCreate: boolean;
  onShowFormView: Function;
  onCloseForm: Function;
  category: Category_Res | undefined;
  setCategory: Function;
}
export default function ViewCategory(props: Props) {
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

  const handleCloseFromView = () => {
    props.onCloseForm("view");
  };

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
              value={props.category?.name}
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
              value={props.category?.description}
            />

            <Box display={"flex"} justifyContent={"space-between"}>
              <Button
                variant="contained"
                type="button"
                startIcon={<SendIcon />}
                sx={{ mt: 3, mb: 2 }}
                onClick={handleCloseFromView}
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
