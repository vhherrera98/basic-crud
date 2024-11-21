"use client";
import { createContext, useState } from 'react';

interface IUser {
 id: number;
 fullname: string;
 email: string;
 created_on: Date;
 isLogged: boolean
}

interface MiContextoProps {
 data: IUser;
 setData: (newData: IUser) => void;
}

export const MyContext = createContext<MiContextoProps>({} as MiContextoProps);

export function MyProvider({ children }: Readonly<{
 children: React.ReactNode;
}>) {

 const [data, setData] = useState<IUser>({ ...{} as IUser, isLogged: false });

 return (
  <MyContext.Provider value={{ data, setData }}>
   {children}
  </MyContext.Provider>
 )

}