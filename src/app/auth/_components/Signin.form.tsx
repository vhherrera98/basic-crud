"use client"
// import Cookies from 'js-cookie';
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

// function syncLocalStorageToCookie(token: { email: string, fullname: string }) {
//   // const token = localStorage.getItem('tasksDB_login'); // O el dato que quieres validar
//   // if (token) {
//   Cookies.set('token', JSON.stringify(token), { secure: true, sameSite: 'strict' });
//   // }
// }



export function SigninForm({ path }: { path: string }) {

  const router = useRouter();
  const { setCookie } = useToken();

  const { handleSubmit, register, formState: { errors } } = useForm<IFormInput>({ mode: 'all' })
  const { validate } = useValidate(errors)
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const response = await fetch(`${path}/auth/login`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      console.log(result)

      if (result.status === 'OK') {
        // Toast().fire({
        //   icon: "success",
        //   title: "Signin successfully"
        // });

        setCookie({
          id: result.data.id,
          fullname: result.data.fullname,
          email: result.data.email,
          created_on: result.data.created_on,
          isLogged: true
        });
        router.push('/tasks');

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
            Inicia sesión con tu cuenta
          </h2>
          <p className="mt-2 text-center text-sm leading-5 text-gray-500 max-w flex gap-2 items-center justify-center">
            ó
            <Link href="/auth/register"
              className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150">
              Create una aquí
            </Link>
          </p>
        </div>

        <div className="">
          <div className="">
            <form onSubmit={handleSubmit(onSubmit)}>

              <div className="mt-6">
                <label htmlFor="email" className="block text-sm font-medium leading-5 text-gray-700">
                  Correo electronico
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
                    className="text-black appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                </div>
                {validate('email') &&
                  <span className="text-red-500 font-medium text-xs">{validate('email').message}</span>
                }
              </div>

              <div className="mt-6">
                <label htmlFor="password_hash" className="block text-sm font-medium leading-5 text-gray-700">
                  Contraseña
                </label>
                <div className="mt-1 rounded-md shadow-sm">
                  <input
                    id="password_hash"
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
                    className="text-black appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                </div>
                {validate('password_hash') &&
                  <span className="text-red-500 font-medium text-xs">{validate('password_hash').message}</span>
                }
              </div>

              <div className="mt-6">
                <span className="block w-full rounded-md shadow-sm">
                  <button type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                    Iniciar sesión
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