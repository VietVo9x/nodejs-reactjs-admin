import { _CATEGORY_CREATE, _CATEGORY_DELETE, _CATEGORY_UPDATE } from "../../apis";
import { deleteData, postData, putData } from "../../apis/api.service";
import { F_Category } from "../../types/form.type";
import { Req_UpdateStatus } from "../../types/request.type";

export class CategoryServices {
  validate(dataForm: F_Category) {
    const error = {
      isError: false,
      msgCategoryName: "",
      msgDescription: "",
    };
    if (!dataForm.category_name) {
      error.isError = true;
      error.msgCategoryName = "Category Name is not empty";
    } else if (dataForm.category_name.length > 100) {
      error.isError = true;
      error.msgCategoryName = "Category must not be longer than 100 characters";
    }
    if (!dataForm.description) {
      error.isError = true;
      error.msgDescription = "Description is not empty";
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
  async updateStatusCategory(id: number, updateStatusCategory: Req_UpdateStatus) {
    try {
      return await putData(_CATEGORY_UPDATE, id, updateStatusCategory);
    } catch (error) {
      throw error;
    }
  }
  async deleteCategory(id: number) {
    try {
      return await deleteData(_CATEGORY_DELETE, id);
    } catch (error) {
      throw error;
    }
  }
}
