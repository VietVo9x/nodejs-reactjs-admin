import { toast } from "react-toastify";

export const displaySuccessMessage = (msg: string) => {
  toast.success(msg, { autoClose: 1000 });
};
