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

export interface Res_Images {
  image_url: string;
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
  brands: Brand_Res[];
}
