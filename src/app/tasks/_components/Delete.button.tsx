"use client";
import { Toast } from "@/hooks/Toast";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

interface IProps {
 children: React.ReactNode;
 className?: string;
 id: number;
}

export function DeletedButton({ children, className, id }: IProps) {

 const router = useRouter();

 const deletedAction = async (id: number) => {
  Swal.fire({
   title: "Estas seguro?",
   text: "Si realzias esta accion no se podra revertir!",
   icon: "warning",
   showCancelButton: true,
   confirmButtonColor: "#3085d6",
   cancelButtonColor: "#d33",
   confirmButtonText: "Si, eliminar",
   cancelButtonText: 'Cancelar'
  }).then(async (result) => {
   if (result.isConfirmed) {

    const response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
     method: 'DELETE',
     mode: 'cors',
     headers: {
      'Content-Type': 'application/json'
     }
    });

    const result = await response.json();

    if (result.status === 'OK') {

     Toast().fire({
      icon: "success",
      title: result.message
     });

     router.push('/tasks')

    } else {

     Toast().fire({
      icon: "error",
      title: result.message
     });
    }
   }
  });
 }

 return (
  <button className={className} type="button" onClick={() => deletedAction(id)}>
   {children}
  </button>
 )
}