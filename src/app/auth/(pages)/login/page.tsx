// 'use client'
// import Cookies from 'js-cookie';
// import { useEffect } from "react";
import { SigninForm } from "../../_components/Signin.form";
// import { useRouter } from "next/navigation";

// function syncLocalStorageToCookie() {
//   const token = localStorage.getItem('tasksDB_login'); // O el dato que quieres validar
//   if (token) {
//     Cookies.set('token', token, { secure: true, sameSite: 'strict' });
//   }
// }

export default function PageRegister() {

  // const router = useRouter();

  // useEffect(() => {
  //   // const data = localStorage.getItem('tasksDB_login');
  //   // if(data){
  //   //   router.push('/tasks')
  //   // }
  //   syncLocalStorageToCookie();
  // }, [])

  return <SigninForm path={`${process.env.PATHNAME}`}/>
}