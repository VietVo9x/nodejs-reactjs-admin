import { _REGISTER, _USER, _USER_BLOCK } from "../../apis";
import { postData, putData } from "../../apis/api.service";
import { F_UserRegister } from "../../types/form.type";
import { Req_UserRegister } from "../../types/request.type";
export default class UserServices {
  async register(dataForm: Req_UserRegister) {
    try {
      return await postData(_REGISTER, dataForm);
    } catch (error) {
      throw error;
    }
  }
  async updateStatusUser(id: number, status: { status: number }) {
    try {
      return await putData(_USER_BLOCK, id, status);
    } catch (error) {
      throw error;
    }
  }
  validator(dataForm: F_UserRegister) {
    const error = {
      isError: false,
      msgEmail: "",
      msgUserName: "",
      msgPassword: "",
      msgConfirmPassword: "",
    };

    //check mail
    const validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!validRegex.test(dataForm.email)) {
      error.isError = true;
      error.msgEmail = "Email is not in the correct format";
    }

    //check user name
    const regex = /^[a-zA-Z]*$/;
    if (!dataForm.user_name) {
      error.isError = true;
      error.msgUserName = "User Name cannot be empty";
    } else if (dataForm.user_name.length < 8) {
      error.isError = true;
      error.msgUserName = "User Name must be at least 8 characters";
    } else if (!regex.test(dataForm.user_name)) {
      error.isError = true;
      error.msgUserName = "Username cannot contain special characters";
    }

    //check password
    if (!dataForm.password) {
      error.isError = true;
      error.msgPassword = "Password cannot be empty";
    } else if (dataForm.password.length < 8) {
      error.isError = true;
      error.msgPassword = "Password must be at least 8 characters long";
    }

    //check confirm password
    if (!dataForm.confirm_password) {
      error.isError = true;
      error.msgConfirmPassword = "Password Confirm cannot be empty";
    } else if (dataForm.confirm_password !== dataForm.password) {
      error.isError = true;
      error.msgConfirmPassword = "Password Confirm do not match";
    }

    return error;
  }
}
