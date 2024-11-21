"use client";
import { Toast } from "@/hooks/Toast";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

interface IProps {
 children: React.ReactNode;
 className?: string;
 id: number;
 path: string;
}

export function DeletedButton({ children, className, id, path }: IProps) {

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

    try {
     console.log(`${path}/tasks/${id}`)
     const response = await fetch(`${path}/tasks/${id}`, {
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
    } catch (error) {
     console.log(path, id)
     console.log(error)
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