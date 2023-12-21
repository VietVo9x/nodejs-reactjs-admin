import SendIcon from "@mui/icons-material/Send";
import { Box, Button, FormHelperText, Modal, TextField } from "@mui/material";
import { Err_Req_UserRegister } from "../../types/error.request";
import { F_UserRegister } from "../../types/form.type";
import { Res_Error } from "../../types/error.response";
import { ToastContainer, toast } from "react-toastify";
import UserServices from "./user.service";
import { displayError } from "../../utils/common/display-error";
interface Props {
  userCreate: F_UserRegister;
  setUserCreate: Function;
  errorForm: Err_Req_UserRegister;
  setErrorForm: Function;
  onShow: Function;
  onClose: Function;
  openFormCreate: boolean;
  flag: boolean;
  setFlag: Function;
}
export default function CreateUser(props: Props) {
  const userService = new UserServices();
  const handleChange = (event: { target: { name: any; value: any } }) => {
    const name = event.target.name;
    const value = event.target.value;
    props.setUserCreate({ ...props.userCreate, [name]: value });
  };

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
  //đóng form
  const handleClose = () => {
    props.onClose("create");
    props.setErrorForm({
      isError: false,
      msgUserName: "",
      msgEmail: "",
      msgPassword: "",
      msgConfirmPassword: "",
    });
    props.setUserCreate({
      user_name: "",
      email: "",
      password: "",
      confirm_password: "",
    });
  };
  //đăng ký
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const validate = userService.validator(props.userCreate);
      props.setErrorForm(validate);
      if (validate.isError) {
        return;
      }
      await userService.register(props.userCreate);
      toast.success("Successful account registration", {
        autoClose: 1000,
      });
      props.setFlag(!props.flag);
      props.onClose("create");
    } catch (error) {
      displayError(error);
    }
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
              id="User Name"
              name="user_name"
              label="User Name"
              fullWidth
              value={props.userCreate.user_name}
              onChange={handleChange}
              error={Boolean(props.errorForm?.msgUserName)}
              helperText={props.errorForm?.msgUserName}
            />
            <TextField
              margin="normal"
              required
              id="Email"
              type="email"
              label="Email"
              name="email"
              fullWidth
              value={props.userCreate.email}
              onChange={handleChange}
              error={Boolean(props.errorForm?.msgEmail)}
              helperText={props.errorForm?.msgEmail}
            />
            <TextField
              margin="normal"
              required
              id="fullName"
              label="Password"
              name="password"
              type="password"
              fullWidth
              value={props.userCreate.password}
              onChange={handleChange}
              error={Boolean(props.errorForm?.msgPassword)}
              helperText={props.errorForm?.msgPassword}
            />
            <TextField
              margin="normal"
              required
              id="confirm_password"
              type="password"
              label="Confirm Password"
              name="confirm_password"
              fullWidth
              value={props.userCreate.confirm_password}
              onChange={handleChange}
              error={Boolean(props.errorForm?.msgConfirmPassword)}
              helperText={props.errorForm?.msgConfirmPassword}
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
