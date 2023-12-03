import { useState } from "react";

export const useFormStatus = () => {
  const [openFormView, setOpenFormView] = useState<boolean>(false);
  const [openFormCreate, setOpenFormCreate] = useState<boolean>(false);
  const [openFormUpdate, setOpenFormUpdate] = useState<boolean>(false);

  const handleShowForm = (formType: string) => {
    if (formType === "view") {
      setOpenFormView(true);
      setOpenFormCreate(false);
      setOpenFormUpdate(false);
    } else if (formType === "create") {
      setOpenFormCreate(true);
      setOpenFormView(false);
      setOpenFormUpdate(false);
    } else if (formType === "update") {
      setOpenFormUpdate(true);
      setOpenFormView(false);
      setOpenFormCreate(false);
    }
  };

  const handleClose = (formType: string) => {
    if (formType === "view") {
      setOpenFormView(false);
    } else if (formType === "create") {
      setOpenFormCreate(false);
    } else if (formType === "update") {
      setOpenFormUpdate(false);
    }
  };

  return { openFormView, openFormCreate, openFormUpdate, handleShowForm, handleClose };
};

export const isFileArrayValidSize = (files: any) => {
  const maxSize = 1 * 1024 * 1024;

  const invalidFiles = files.filter((file: any) => {
    // Kiểm tra kích thước
    if (file.size > maxSize) {
      return true;
    }
    return false;
  });

  return invalidFiles;
};
export const isValidFileTypes = (files: any) => {
  const allowedExtensions = [".jpg", ".jpeg", ".png"];

  for (let i = 0; i < files.length; i++) {
    const fileName = files[i].name;
    const extension = fileName.substring(fileName.lastIndexOf(".")).toLowerCase();

    if (!allowedExtensions.includes(extension)) {
      return false;
    }
  }

  return true; // Trả về true nếu tất cả các tệp tin đều hợp lệ
};
export const isValidFileType = (fileName: any) => {
  const allowedExtensions = [".jpg", ".jpeg", ".png"];
  const extension = fileName.substring(fileName.lastIndexOf(".")).toLowerCase();
  return allowedExtensions.includes(extension);
};
