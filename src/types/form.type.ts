export interface F_UserRegister {
  user_name: string;
  email: string;
  password: string;
  confirm_password: string;
}
export interface F_UserInfo {
  user_name: string;
  email: string;
  full_name: string;
  address: string;
  phone: string;
}
export interface F_Product {
  product_name: string;
  price: number | undefined;
  quantity_stock: number | undefined;
  description: string;
  categoryId: number;
  fileInput: undefined | File[];
}
export interface F_Product_Update {
  product_name: string;
  price: number;
  quantity_stock: number;
  description: string;
  categoryId: number;
  fileInput: undefined | File[];
}
export interface F_Category {
  name: string;
  description: string;
}
