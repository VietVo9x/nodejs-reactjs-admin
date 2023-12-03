import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Stack } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Typography from "@mui/material/Typography";
import { useContext, useState } from "react";
import { Req_UserLogin } from "../../types/request.type";
import { LoginServices } from "./login.service";
import { I_IsLoginContext, IsLoginContext } from "../../Context/login.context";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { setUser, setIsLogin }: I_IsLoginContext = useContext(IsLoginContext);
  const navigate = useNavigate();

  const [dataForm, setDataForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    isError: false,
    msgEmail: "",
    msgPassword: "",
  });
  const loginServices = new LoginServices();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const error = await loginServices.validator(dataForm); //validate form

    if (error.isError) {
      setError({ ...error });
      return;
    }
    setError({ ...error });
    loginServices
      .login(dataForm)
      .then((reponse) => {
        setUser(reponse);
        setIsLogin(true);
        navigate("/dash-board");
      })
      .catch((error) => {
        toast.error(error.message, { autoClose: 1000 });
      });
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setDataForm((prev: Req_UserLogin) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <ToastContainer />
      <Stack mt={5}>
        <Box
          component="form"
          noValidate
          sx={{
            mt: 1,
            width: "400px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "0 auto",
          }}
          onSubmit={handleSubmit}
        >
          <Typography component={"h1"} variant="h4" align="center" color={"secondary"} gutterBottom>
            Sign In
          </Typography>

          <TextField
            margin="normal"
            required
            id="email"
            label="Email"
            name="email"
            fullWidth
            onChange={handleChange}
            error={error.isError && error.msgEmail.length > 0}
            helperText={error.msgEmail}
          />
          <TextField
            margin="normal"
            required
            id="password"
            type="password"
            label="Password"
            name="password"
            fullWidth
            onChange={handleChange}
            error={error.isError && error.msgPassword.length > 0}
            helperText={error.msgPassword}
          />

          <Button
            variant="contained"
            type="submit"
            startIcon={<SendIcon />}
            fullWidth
            sx={{ mt: 3, mb: 2 }}
            color="secondary"
          >
            Sign In
          </Button>
        </Box>
      </Stack>
    </div>
  );
}
