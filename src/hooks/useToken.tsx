import { MyContext } from '@/context/ProviderToken';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';

interface IUser {
 id: number;
 fullname: string;
 email: string;
 created_on: Date;
 isLogged: boolean;
}

export function useToken() {

 const context = useContext(MyContext);
 const { setData, data } = context;
 // const [isLogged, setIsLogged] = useState<boolean>(false);

 const router = useRouter();

 // useEffect(() => {
 //  console.log(data)
 //  setIsLogged(true)
 // }, [data])

 const setCookie = (data: IUser) => {
  localStorage.setItem('tasksDB_login', JSON.stringify(data));
  Cookies.set('tasksDB_login', JSON.stringify(data), { secure: true, sameSite: 'strict' });
  setData({ ...data, isLogged: true });
  // setIsLogged(true);
 }

 const getCookie = () => {
  const token = localStorage.getItem('tasksDB_login');

  if (token) {
   Cookies.set('tasksDB_login', JSON.stringify(token), { secure: true, sameSite: 'strict' });
   setData({ ...JSON.parse(token), isLogged: true });
   // setIsLogged(true);
  }
 }

 const deleteToken = () => {
  localStorage.removeItem("tasksDB_login");
  Cookies.remove("tasksDB_login");
  setData({ ...{} as IUser, isLogged: false });

  // setIsLogged(false);
  router.push('/auth/login')
 }

 return { setCookie, getCookie, deleteToken, user: data }

}