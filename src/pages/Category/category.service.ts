import {
  _CATEGORY_BLOCK,
  _CATEGORY_CREATE,
  _CATEGORY_SOFTDELETE,
  _CATEGORY_UPDATE,
} from "../../apis";
import { patchData, postData, putData } from "../../apis/api.service";
import { F_Category } from "../../types/form.type";
import { Req_UpdateCategory } from "../../types/request.type";

export class CategoryServices {
  validate(dataForm: F_Category) {
    const error = {
      isError: false,
      msgCategoryName: "",
      msgDescription: "",
    };
    if (!dataForm.name) {
      error.isError = true;
      error.msgCategoryName = "Category Name is not empty";
    } else if (dataForm.name.length > 100) {
      error.isError = true;
      error.msgCategoryName = "Category must not be longer than 100 characters";
    }
    if (!dataForm.description) {
      error.isError = true;
      error.msgDescription = "Description is not empty";
    } else if (dataForm.description.length > 200) {
      error.isError = true;
      error.msgDescription = "Description must not be longer than 200 characters";
    }
    return error;
  }
  async insertCategory(dataForm: F_Category) {
    try {
      return await postData(_CATEGORY_CREATE, dataForm);
    } catch (error) {
      throw error;
    }
  }
  async updateCategory(id: number, updateStatusCategory: Req_UpdateCategory) {
    try {
      return await putData(_CATEGORY_UPDATE, id, updateStatusCategory);
    } catch (error) {
      throw error;
    }
  }
  async blockCategory(id: number, updateStatus: { status: string }) {
    try {
      return await patchData(_CATEGORY_BLOCK, id, updateStatus);
    } catch (error) {
      throw error;
    }
  }
  async softDelete(id: number, softDelete: { isDelete: string }) {
    try {
      return await patchData(_CATEGORY_SOFTDELETE, id, softDelete);
    } catch (error) {
      throw error;
    }
  }
}
