import { F_Category } from "../../types/form.type";

export class CategoryServices {
  validate(dataForm: F_Category) {
    const error = {
      isError: false,
      msgCategoryName: "",
      msgDescription: "",
    };
  }
  insertCategory() {}
  updateStatusCategory() {}
}
