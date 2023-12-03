import SendIcon from "@mui/icons-material/Send";
import { Box, Button, Modal, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Res_UserEntity } from "../../types/reponse.type";
import { F_UserInfo } from "../../types/form.type";
interface Props {
  data: Res_UserEntity | undefined;
  openFormView: boolean;
  onShowViewForm: Function;
  onClose: Function;
}
export default function ViewUser(props: Props) {
  const [dataForm, setFormData] = useState<Res_UserEntity | F_UserInfo>({
    user_name: "",
    email: "",
    password: "",
    full_name: "",
    address: "",
    phone: "",
  });

  useEffect(() => {
    if (props.data) {
      setFormData({
        user_name: props.data.user_name,
        email: props.data.email,
        password: props.data.password,
        full_name: props.data.full_name,
        address: props.data.address,
        phone: props.data.phone,
      });
    }
  }, [props.data]);
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
  const handleClose = () => {
    props.onClose("view");
    setFormData({
      user_name: "",
      email: "",
      password: "",
      full_name: "",
      address: "",
      phone: "",
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
            />
            <TextField
              margin="normal"
              required
              id="fullName"
              label="Full Name"
              name="full_name"
              fullWidth
              value={dataForm.full_name}
            />
            <TextField
              margin="normal"
              required
              id="Password"
              type="password"
              label="Password"
              name="password"
              fullWidth
              value={dataForm.password}
            />

            <TextField
              margin="normal"
              required
              id="phone"
              label="Phone"
              name="phone"
              fullWidth
              value={dataForm.phone}
            />
            <TextField
              margin="normal"
              required
              id="address"
              label="Address"
              name="address"
              fullWidth
              value={dataForm.address}
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
