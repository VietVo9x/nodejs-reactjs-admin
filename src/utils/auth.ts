import { getData } from "../apis/api.service";
import { _VERIFY_TOKEN } from "../apis";

export const auth = async () => {
  const adminLocal = localStorage.getItem("adminLogin");
  if (adminLocal) {
    const admin = JSON.parse(adminLocal);
    return getData("user_admin");
    // if (adminDB.email == admin.email) {
    //   return true;
    // } else {
    //   return false;
    // }
  }
};

export const checkLogin = async () => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      const user = await getData(_VERIFY_TOKEN);
      console.log(user);
      return user?.data;
    }
  } catch (error) {
    throw error;
  }
};
