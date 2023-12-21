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
