import { toast } from "react-toastify";
import { Res_Error } from "../../types/error.response";

export function displayError(error: any) {
  const newError = error as Res_Error;

  if (Array.isArray(newError.message)) {
    const errorMessage =
      newError.message.length === 1 ? newError.message[0] : newError.message.join(", ");
    showToast(errorMessage);
  } else {
    showToast(newError.message);
  }
}

export function showToast(message: string[] | string) {
  toast.error(message, {
    autoClose: 1000,
  });
}
