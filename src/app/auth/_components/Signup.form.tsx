"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from 'react-hook-form';
import { Toast } from '@/hooks/Toast'
import { useValidate } from "@/hooks/useValidate";
import { useToken } from "@/hooks/useToken";

interface IFormInput {
 fullname: string
 email: string
 password_hash: string
 confirm_password: string
}

export function Signup() {

 const router = useRouter();
 const { setCookie } = useToken();

 const { handleSubmit, register, formState: { errors }, watch } = useForm<IFormInput>({ mode: 'all' })
 const { validate } = useValidate(errors)
 const onSubmit: SubmitHandler<IFormInput> = async (data) => {
  try {
   const response = await fetch('http://localhost:3000/api/auth/register', {
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
     title: "Signup in successfully"
    });

    setCookie({
     id: result.data.id,
     fullname: result.data.fullname,
     email: result.data.email,
     created_on: result.data.created_on,
     isLogged: true
    });

    router.push('/tasks')
   } else {
    Toast().fire({
     icon: "error",
     title: result.message
    });
   }

  } catch (error) {
   console.log(error)
   Toast().fire({
    icon: "error",
    title: 'Internal error server'
   });
  }
 };

 return (
  <>
   <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
     <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
      Create una nueva cuenta
     </h2>
     <p className="mt-2 text-center text-sm leading-5 text-gray-500 max-w flex gap-2 items-center justify-center">
      ó
      <Link href="/auth/login"
       className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150">
       ingresa con tu cuenta
      </Link>
     </p>
    </div>

    <div className="">
     <div className="">
      <form onSubmit={handleSubmit(onSubmit)}>
       <div>
        <label htmlFor="email" className="block text-sm font-medium leading-5  text-gray-700">Nombre completo</label>
        <div className="mt-1 relative rounded-md shadow-sm">
         <input
          id="name"
          placeholder="John Doe"
          type="text"
          {
          ...register('fullname', {
           required: {
            value: true,
            message: 'El nombre es requerido'
           },
           minLength: {
            value: 3,
            message: 'El nombre debe tener minimo 3 caracteres'
           }, maxLength: 100
          })
          }
          className="text-black appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
         />
        </div>
        {validate('fullname') &&
         <span className="text-red-500 font-medium text-xs">{validate('fullname').message}</span>
        }
       </div>

       <div className="mt-6">
        <label htmlFor="email" className="block text-sm font-medium leading-5 text-gray-700">
         Email address
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
         <input
          id="email"
          placeholder="user@example.com"
          type="email"

          {
          ...register('email', {
           required: {
            value: true,
            message: 'El email es requerido'
           },
           pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: 'Ingrese un correo electronico correcto (example@domain.com)'
           },
           maxLength: 100
          })
          }
          className="text-black appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
         />
        </div>
        {validate('email') &&
         <span className="text-red-500 font-medium text-xs">{validate('email').message}</span>
        }
       </div>

       <div className="mt-6">
        <label htmlFor="password" className="block text-sm font-medium leading-5 text-gray-700">
         Password
        </label>
        <div className="mt-1 rounded-md shadow-sm">
         <input
          id="password"
          type="password"

          {
          ...register('password_hash', {
           required: {
            value: true,
            message: 'La contraseña es requerida'
           },
           minLength: {
            value: 8,
            message: 'Debe tener minimamente 8 caracteres'
           },
           maxLength: 100
          })
          }
          className="text-black appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
         />
        </div>
        {validate('password_hash') &&
         <span className="text-red-500 font-medium text-xs">{validate('password_hash').message}</span>
        }
       </div>

       <div className="mt-6">
        <label htmlFor="password_confirmation" className="block text-sm font-medium leading-5 text-gray-700">
         Confirm Password
        </label>
        <div className="mt-1 rounded-md shadow-sm">
         <input
          id="password_confirmation"
          type="password"

          {
          ...register('confirm_password', {
           // required: {
           //  value: true,
           //  message: 'La confirmacion contraseña es requerida'
           // },
           // minLength: {
           //  value: 8,
           //  message: 'Debe tener minimamente 8 caracteres'
           // },
           validate: value => watch('password_hash') === value || 'Las contraseñas deben ser iguales',
           maxLength: 100
          })
          }
          className="text-black appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
         />
        </div>

        {validate('confirm_password') &&
         <span className="text-red-500 font-medium text-xs">{validate('confirm_password').message}</span>
        }

       </div>

       <div className="mt-6">
        <span className="block w-full rounded-md shadow-sm">
         <button type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
          Crear una cuenta
         </button>
        </span>
       </div>
      </form>

     </div>
    </div>
   </div>
  </>
 )
}