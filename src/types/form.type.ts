export interface F_UserRegister {
  user_name: string;
  email: string;
  password: string;
  confirm_password: string;
}
export interface F_UserInfo {
  user_name: string;
  email: string;
  password: string;
  full_name: string;
  address: string;
  phone: string;
}
export interface F_Product {
  sku: string;
  product_name: string;
  price: number | undefined;
  quantity_stock: number | undefined;
  description: string;
  category_id: undefined | number;
  fileInput: undefined | File[];
}
export interface F_Product_Update {
  sku: string;
  product_name: string;
  price: number | undefined;
  quantity_stock: number | undefined;
  description: string;
  category_id: undefined | number;
  fileInput?: undefined | File[];
}
export interface F_Category {
  category_name: string;
  description: string;
}
