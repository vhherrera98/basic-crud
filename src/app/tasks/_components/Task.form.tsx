"use client";

import { Toast } from "@/hooks/Toast";
import { useValidate } from "@/hooks/useValidate";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form"

interface IFormInput {
 id: number;
 title: string;
 description: string;
 is_active: boolean;
}

interface IProps {
 data?: IFormInput
}

export function TaskForm({ data: outsideData }: IProps) {

 const router = useRouter();

 const { register, handleSubmit, formState: { errors }, reset } = useForm<IFormInput>({ mode: 'all' })
 const { validate } = useValidate(errors);
 const [active, setActive] = useState<boolean>(false);

 useEffect(() => {
  if (outsideData) {
   reset(outsideData)
   setActive(outsideData.is_active);
  }
 }, [outsideData])

 const onSave: SubmitHandler<IFormInput> = async (data) => {
  const response = await fetch('http://localhost:3000/api/tasks', {
   method: 'POST',
   mode: 'cors',
   headers: {
    'Content-Type': 'application/json'
   },
   body: JSON.stringify(data)
  });

  const result = await response.json();

  if (result.status === 'OK') {

   Toast().fire({
    icon: "success",
    title: result.message
   });

   router.push('/tasks');

  } else {

   Toast().fire({
    icon: "error",
    title: result.message
   });
  }
 }

 const onPut: SubmitHandler<IFormInput> = async (data) => {

  const newData = {
   ...data,
   is_active: active
  };

  const response = await fetch(`http://localhost:3000/api/tasks/${data.id}`, {
   method: 'PUT',
   mode: 'cors',
   headers: {
    'Content-Type': 'application/json'
   },
   body: JSON.stringify(newData)
  });

  const result = await response.json();

  if (result.status === 'OK') {

   Toast().fire({
    icon: "success",
    title: result.message
   });

   router.push('/tasks');

  } else {

   Toast().fire({
    icon: "error",
    title: result.message
   });
  }
 }

 const onSubmit: SubmitHandler<IFormInput> = async (data) => {
  try {
   if (!outsideData) return await onSave(data);
   return await onPut(data);

  } catch (error) {
   console.log(error)
   Toast().fire({
    icon: "error",
    title: 'Internal error server'
   });
  }
 }

 return (
  <form onSubmit={handleSubmit(onSubmit)} className="w-full md:w-[500px] mx-auto flex flex-col gap-5">

   {outsideData &&
    <div>
     <button onClick={() => setActive(!active)} type="button" className={`text-xs py-2 px-4 rounded-full text-white ${active ? 'bg-red-500' : 'bg-green-500'}`}>
      {active ? 'Desactivar' : 'Activar'}
     </button>
    </div>
   }

   <div className="relative">
    <label htmlFor="title" className="font-medium text-gray-600">Titulo</label>
    <input
     type="text"
     id="title"
     {
     ...register('title', {
      required: {
       value: true,
       message: 'El titulo es requerido!'
      },
      minLength: {
       value: 5,
       message: 'Debe contener minimo 5 caracteres'
      }
     })
     }
     className={`bg-gray-50 w-full border border-gray-300 rounded-md py-1 px-3 ${validate('title').all?.type ? 'outline-red-500 border-red-300' : 'outline-blue-300'}`}
    />
    {
     validate('title').show &&
     <span className="text-red-500 text-xs font-bold absolute right-0 -bottom-5 w-full text-right">{validate('title').message}</span>
    }
   </div>
   <div className="relative">
    <label htmlFor="description" className="font-medium text-gray-600">Description</label>
    <textarea
     id="description"
     {
     ...register('description', {
      required: {
       value: true,
       message: 'La descripcion es requerida!'
      },
      minLength: {
       value: 5,
       message: 'Debe contener minimo 5 caracteres'
      }
     })
     }
     rows={5}
     className={`bg-gray-50 w-full border border-gray-300 rounded-md py-1 px-3 ${validate('description').all?.type ? 'outline-red-500 border-red-300' : 'outline-blue-300'}`}
    ></textarea>
    {
     validate('description').show &&
     <span className="text-red-500 text-xs font-bold absolute right-0 -bottom-5 w-full text-right">{validate('description').message}</span>
    }
   </div>
   {
    outsideData
     ? <button type="submit" className="py-2 px-5 rounded-md bg-yellow-500 text-white font-bold hover:bg-yellow-600 inline-block w-auto mr-auto">Modificar tarea</button>
     : <button type="submit" className="py-2 px-5 rounded-md bg-blue-500 text-white font-bold hover:bg-blue-600 inline-block w-auto mr-auto">Registrar tarea</button>
   }
  </form>
 )
}