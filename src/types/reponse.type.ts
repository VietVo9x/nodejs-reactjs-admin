export interface Res_UserLogin {
  token: string;
}

export interface User_Res {
  id: number;
  user_name: string;
  email: string;
  password?: string;
  status: boolean;
  role: number;
  full_name: string;
  address: string;
  phone: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface Image_Res {
  imageUrl: string;
}
export interface Brand_Res {
  id: number;
  name: string;
  description: string;
  status: boolean;
}
export interface Category_Res {
  id: number;
  name: string;
  description: string;
  status: boolean;
  isDelete: boolean;
}

export interface Product_Res {
  id: number;
  price: number;
  product_name: string;
  quantity_stock: number;
  description: string;
  categoryId: number;
  brandId: number;
  status: boolean;
  isDelete: boolean;
  createdAt: Date;
  updatedAt: Date;
  images: Image_Res[];
  category: Category_Res;
}
