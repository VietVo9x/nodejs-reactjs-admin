import axios, { AxiosError } from "axios";
import { api } from ".";
import { axiosInstance } from "./config.axios";

//get data
export const getData = async (pathName: string, params?: any) => {
  try {
    const response = await axiosInstance.get(api + pathName, { params: params });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw error.response.data;
    }
  }
};
//get data kem id
export const getDataForID = async (pathName: string, id: string) => {
  try {
    const response = await axiosInstance.get(`${api}${pathName}/${id}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw error.response.data;
    }
  }
};

//them moi
export const postData = async (pathName: string, data: any) => {
  try {
    const response = await axiosInstance.post(api + pathName, data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw error.response.data;
    }
  }
};

//edit toan bo
export const putData = async (pathName: string, id: any, data: any) => {
  try {
    const response = await axiosInstance.put(`${api}${pathName}/${id}`, data);

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw error.response.data;
    }
  }
};
//edit 1 phan
export const patchData = async (pathName: string, id: any, data: any) => {
  try {
    const response = await axiosInstance.patch(`${api}${pathName}/${id}`, data);

    return response;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw error.response.data;
    }
  }
};

export const deleteData = async (pathName: string, id: any) => {
  try {
    const response = await axiosInstance.delete(api + pathName + "/" + id);
    return response;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw error.response.data;
    }
  }
};
