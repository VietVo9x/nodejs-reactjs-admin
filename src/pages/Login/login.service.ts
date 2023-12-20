import { postData } from "../../apis/api.service";
import { Req_UserLogin } from "../../types/request.type";
import { _LOGIN } from "../../apis";

export class LoginServices {
  async validator(dataForm: Req_UserLogin) {
    const error = {
      isError: false,
      msgEmail: "",
      msgPassword: "",
    };
    //check mail
    const validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!validRegex.test(dataForm.email)) {
      error.isError = true;
      error.msgEmail = "Email is not in the correct format";
    }

    //check password
    if (!dataForm.password) {
      error.isError = true;
      error.msgPassword = "Password cannot be empty";
    } else if (dataForm.password.length < 8) {
      error.isError = true;
      error.msgPassword = "Password must be at least 8 characters long";
    }

    // return all error
    return error;
  }
  async login(dataForm: Req_UserLogin) {
    try {
      const userLogin = await postData(_LOGIN, dataForm);
      if (userLogin?.data.role == 0) throw new Error("Your account is not an admin");
      localStorage.setItem("token", userLogin?.data.token);

      return userLogin?.data.user;
    } catch (error) {
      throw error;
    }
  }
}
