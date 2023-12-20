import SendIcon from "@mui/icons-material/Send";
import { Box, Button, Modal, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { F_UserInfo } from "../../types/form.type";
import { User_Res } from "../../types/reponse.type";
interface Props {
  data: User_Res | undefined;
  openFormView: boolean;
  onShowViewForm: Function;
  onClose: Function;
}
export default function ViewUser(props: Props) {
  const [dataForm, setFormData] = useState<User_Res>({
    id: 0,
    user_name: "",
    email: "",
    password: "",
    status: false,
    role: 0,
    full_name: "",
    address: "",
    phone: "",
    avatar: "",
    createdAt: "",
    updatedAt: "",
    deletedAt: "",
  });

  useEffect(() => {
    if (props.data) {
      setFormData({
        id: props.data.id,
        user_name: props.data.user_name,
        email: props.data.email,
        password: props.data.password,
        status: props.data.status,
        role: props.data.role,
        full_name: props.data.full_name,
        address: props.data.address,
        phone: props.data.phone,
        avatar: props.data.avatar,
        createdAt: props.data.createdAt,
        updatedAt: props.data.updatedAt,
        deletedAt: props.data.deletedAt,
      });
    }
  }, [props.data]);
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "600px",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };
  const handleClose = () => {
    props.onClose("view");
    setFormData({
      id: 0,
      user_name: "",
      email: "",
      password: "",
      status: false,
      role: 0,
      full_name: "",
      address: "",
      phone: "",
      avatar: "",
      createdAt: "",
      updatedAt: "",
      deletedAt: "",
    });
  };
  return (
    <div>
      <Modal
        open={props.openFormView}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box component="form" noValidate sx={{ mt: 1, width: "100%" }}>
            <TextField
              margin="normal"
              required
              id="User Name"
              name="user_name"
              label="User Name"
              fullWidth
              value={dataForm.user_name}
              disabled={true}
            />
            <TextField
              margin="normal"
              required
              id="Email"
              type="email"
              label="Email"
              name="email"
              fullWidth
              value={dataForm.email}
              disabled={true}
            />
            <TextField
              margin="normal"
              required
              id="fullName"
              label="Full Name"
              name="full_name"
              fullWidth
              value={dataForm.user_name}
              disabled={true}
            />

            <TextField
              margin="normal"
              required
              id="phone"
              label="Phone"
              name="phone"
              fullWidth
              value={dataForm.phone}
              disabled={true}
            />
            <TextField
              margin="normal"
              required
              id="address"
              label="Address"
              name="address"
              fullWidth
              value={dataForm.address}
              disabled={true}
            />

            <Box display={"flex"} justifyContent={"space-between"}>
              <Button
                variant="contained"
                type="button"
                startIcon={<SendIcon />}
                sx={{ mt: 3, mb: 2 }}
                onClick={handleClose}
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
