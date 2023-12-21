//requeq type

export interface Req_UserLogin {
  email: string;
  password: string;
}
export interface Req_UserRegister {
  user_name: string;
  email: string;
  password: string;
  confirm_password: string;
}
export interface Req_UpdateCategory {
  name: string;
  description: string;
}
