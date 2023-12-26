import { patchData, postData, putData } from "../../apis/api.service";
import { F_Product } from "../../types/form.type";
import { _PRODUCT } from "../../apis";
import { isFileArrayValidSize, isValidFileTypes } from "../../utils/common/validatetype";
import { isNumber } from "util";

export class ProductServices {
  async createProduct(dataForm: F_Product) {
    try {
      const productData = new FormData();

      productData.append("product_name", dataForm.product_name);
      productData.append("price", String(dataForm.price));
      productData.append("quantity_stock", String(dataForm.quantity_stock));
      productData.append("description", dataForm.description);
      productData.append("categoryId", String(dataForm.categoryId));
      if (dataForm.fileInput && dataForm.fileInput.length > 0) {
        dataForm?.fileInput.forEach((file) => {
          productData.append(`products`, file);
        });
      }

      const insertProduct = await postData(_PRODUCT, productData);
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
    } else if (dataForm.product_name.length > 255) {
      error.isError = true;
      error.msgProductName = "Product name must not exceed 255 characters.";
    }

    if (!dataForm.categoryId) {
      error.isError = true;
      error.msgCategory = "Category name must not be empty.";
    }
    if (!dataForm.description) {
      error.isError = true;
      error.msgDescription = "Description must not be empty.";
    } else if (dataForm.description.length > 1000) {
      error.isError = true;
      error.msgDescription = "Description Length must not exceed 255 characters";
    }
    if (!dataForm.price) {
      error.isError = true;
      error.msgPrice = "Price must not be empty.";
    } else if (Number(dataForm.price) <= 0) {
      error.isError = true;
      error.msgPrice = "Price must be greater than 0";
    } else if (isNaN(dataForm.price)) {
      error.isError = true;
      error.msgPrice = "Price must be a number";
    }
    if (!dataForm.quantity_stock) {
      error.isError = true;
      error.msgQuantityStock = "Stock quantity must not be empty.";
    } else if (Number(dataForm.quantity_stock) <= 0) {
      error.isError = true;
      error.msgQuantityStock = "Stock quantity must be greater than 0";
    } else if (isNaN(dataForm.quantity_stock)) {
      error.isError = true;
      error.msgQuantityStock = "Quantity must be a number";
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
      productData.append("product_name", dataForm.product_name);
      productData.append("price", String(dataForm.price));
      productData.append("quantity_stock", String(dataForm.quantity_stock));
      productData.append("description", dataForm.description);
      productData.append("categoryId", String(dataForm.categoryId));

      if (dataForm.fileInput && dataForm.fileInput.length > 0) {
        dataForm?.fileInput.forEach((file: File) => {
          productData.append(`products`, file);
        });
      }

      const insertProduct = await putData(_PRODUCT, id, productData);
      return insertProduct;
    } catch (error) {
      throw error;
    }
  }
  softDelete = async (id: number, softDelete: { isDelete: string }) => {
    try {
      return await patchData(_PRODUCT, id, softDelete);
    } catch (error) {
      throw error;
    }
  };
}
