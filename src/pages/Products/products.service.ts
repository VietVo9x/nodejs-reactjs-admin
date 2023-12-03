import { deleteData, postData, putData } from "../../apis/api.service";
import { F_Product } from "../../types/form.type";
import { _PRODUCT_CREATE, _PRODUCT_DELETE, _PRODUCT_UPDATE } from "../../apis";
import { isFileArrayValidSize, isValidFileTypes } from "../../utils/function.custom";

export class ProductServices {
  async createProduct(dataForm: F_Product) {
    try {
      const productData = new FormData();

      productData.append("sku", dataForm.sku);
      productData.append("product_name", dataForm.product_name);
      productData.append("price", String(dataForm.price));
      productData.append("quantity_stock", String(dataForm.quantity_stock));
      productData.append("description", dataForm.description);
      productData.append("category_id", String(dataForm.category_id));
      if (dataForm.fileInput && dataForm.fileInput.length > 0) {
        dataForm?.fileInput.forEach((file) => {
          productData.append(`images`, file);
        });
      }

      const insertProduct = await postData(_PRODUCT_CREATE, productData);
      return insertProduct;
    } catch (error) {
      throw error;
    }
  }
  validator(dataForm: F_Product) {
    const error = {
      isError: false,
      msgSku: "",
      msgCategory: "",
      msgProductName: "",
      msgDescription: "",
      msgPrice: "",
      msgQuantityStock: "",
      msgImage: "",
    };

    if (!dataForm.product_name) {
      error.isError = true;
      error.msgProductName = "Product name must not be empty.";
    }
    if (!dataForm.sku) {
      error.isError = true;
      error.msgSku = "Sku must not be empty.";
    }
    if (dataForm.category_id == null) {
      error.isError = true;
      error.msgCategory = "Category name must not be empty.";
    }
    if (!dataForm.description) {
      error.isError = true;
      error.msgDescription = "Description must not be empty.";
    }
    if (!dataForm.price) {
      error.isError = true;
      error.msgPrice = "Price must not be empty.";
    }
    if (!dataForm.quantity_stock) {
      error.isError = true;
      error.msgQuantityStock = "Stock quantity must not be empty.";
    }

    if (!dataForm.fileInput) {
      error.isError = true;
      error.msgImage = "Image quantity must not be empty.";
    } else if (dataForm.fileInput.length < 4 || dataForm.fileInput.length > 4) {
      error.isError = true;
      error.msgImage = "Uploaded file must be at least 4 characters";
      const invalidFilesSize = isFileArrayValidSize(dataForm.fileInput);
      const invalidFilesType = isValidFileTypes(dataForm.fileInput);
      if (!invalidFilesSize) {
        error.isError = true;
        error.msgImage = "Image maximum size is 1MB";
      } else if (!invalidFilesType) {
        error.isError = true;
        error.msgImage = "Image must be jpg,png,jpeg";
      }
    }
    return error;
  }
  async editProduct(dataForm: any, id: number) {
    try {
      const productData = new FormData();

      productData.append("sku", dataForm.sku);
      productData.append("product_name", dataForm.product_name);
      productData.append("price", String(dataForm.price));
      productData.append("quantity_stock", String(dataForm.quantity_stock));
      productData.append("description", dataForm.description);
      productData.append("category_id", String(dataForm.category_id));
      if (dataForm.fileInput && dataForm.fileInput.length > 0) {
        dataForm?.fileInput.forEach((file: File) => {
          productData.append(`images`, file);
        });
      }

      const insertProduct = await putData(_PRODUCT_UPDATE, id, productData);
      return insertProduct;
    } catch (error) {
      throw error;
    }
  }
  deleteProduct = async (id: number) => {
    try {
      return await deleteData(_PRODUCT_DELETE, id);
    } catch (error) {
      throw error;
    }
  };
}
