export interface Err_Req_UserRegister {
  isError: boolean;
  msgUserName: string;
  msgEmail: string;
  msgPassword: string;
  msgConfirmPassword: string;
}
export interface Err_Req_Product {
  isError: boolean;
  msgSku: string;
  msgProductName: string;
  msgDescription: string;
  msgPrice: string;
  msgQuantityStock: string;
  msgImage: string;
  msgCategory: string;
}
export interface Err_Req_Category {
  isError: boolean;
  msgCategoryName: string;
  msgDescription: string;
}
