import Swal from "sweetalert2";

type SwalStatus = "success" | "error" | "warning" | "info" | "question";

interface IToast {
  status?: SwalStatus;
  message: string;
  title?: string;
  autoClose?: number;
  showCancelButton?: boolean;
  cancelButtonText?: string;
  showConfirmButton?: boolean;
  confirmButtonText?: string;
}

export const notificationCenter = ({
  status = "info",
  message,
  title,
  autoClose,
  showCancelButton,
  cancelButtonText,
  showConfirmButton,
  confirmButtonText,
}: IToast): void => {
  Swal.fire({
    title: title,
    text: message,
    icon: status,
    timer: autoClose !== undefined ? autoClose : 7000,
    showConfirmButton: showConfirmButton,
    confirmButtonText: confirmButtonText,
    timerProgressBar: true,
    showCancelButton: showCancelButton,
    cancelButtonText: cancelButtonText,
  });
};
