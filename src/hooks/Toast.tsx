import Swal from "sweetalert2";

export function Toast() {

 const ToastMixin = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
   toast.onmouseenter = Swal.stopTimer;
   toast.onmouseleave = Swal.resumeTimer;
  }
 });

 return ToastMixin;
}