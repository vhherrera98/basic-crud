export const dynamic = 'force-dynamic';

import { IResponse, ITask } from "@/interfaces";
import moment from 'moment'
import Link from "next/link";
import { DeletedButton } from "../_components/Delete.button";

interface IProps extends IResponse {
 data: ITask[]
}

async function fetching(): Promise<IProps> {
 const response = await fetch(`${process.env.PATHNAME}/tasks`);
 const result = await response.json();
 return result
}

export default async function Page() {
 const response = await fetching();

 const columns = [
  { Header: 'Titulo', accessor: 'title' },
  { Header: 'Descripcion', accessor: 'description' },
  { Header: 'Estado', accessor: 'is_active' },
  { Header: 'Creacion', accessor: 'created_on' },
  { Header: 'Acciones', accessor: 'actions' },
 ];

 return (
  <main className="container mx-auto px-5 md:px-0 py-10">
   <div className="flex flex-col gap-5">
    <h1 className="text-2xl font-bold text-center text-gray-700">Lista de tareas</h1>
    {/* <Table columns={columns} data={response.data} /> */}
    <table className="min-w-full bg-white border border-gray-200">
     <thead className="bg-gray-200">
      <tr>
       {columns.map((column) => (
        <th
         key={column.accessor}
         className="py-2 px-4 border-b border-gray-200 text-left text-gray-600"
        >
         {column.Header}
        </th>
       ))}
      </tr>
     </thead>
     <tbody>
      {/* {response.data.map((row, rowIndex) => (
       <tr key={rowIndex} className="even:bg-gray-50">
        {columns.map((column) => (
         <td
          key={column.accessor}
          className="py-2 px-4 border-b border-gray-200 text-gray-800"
         >
          {row[column.accessor]}
         </td>
        ))}
       </tr>
      ))} */}
      {
       response.data.map(({ id, title, description, is_active, created_on }, idx) => (
        <tr key={idx} className="even:bg-gray-50">
         <td className="py-2 px-4 border-b border-gray-200 text-gray-800">{title}</td>
         <td className="py-2 px-4 border-b border-gray-200 text-gray-800">
          <p className="text-wrap">
           {description}
          </p>
         </td>
         <td className="py-2 px-4 border-b border-gray-200 text-gray-800">
          <span className={`${is_active ? 'bg-green-500' : 'bg-red-500'} text-white font-medium px-2 py-1 rounded-full`}>{is_active ? 'activo' : 'inactivo'}</span>
         </td>
         <td className="py-2 px-4 border-b border-gray-200 text-gray-800">
          <p className="text-sm text-gray-500">{moment(created_on).format('L')}</p>
         </td>
         <td className="py-2 px-4 border-b border-gray-200 text-gray-800">
          <div className="flex flex-col items-center justify-center gap-3">
           <Link href={`/tasks/${id}`} className="w-full py-1 px-3 rounded-md text-gray-800 bg-yellow-500 font-bold text-xs text-center">Modificar</Link>
           <DeletedButton path={`${process.env.PATHNAME}`} id={id} className="w-full py-1 px-3 rounded-md text-gray-800 bg-red-500 font-bold text-xs">
            Eliminar
           </DeletedButton>
          </div>
         </td>
        </tr>
       ))
      }
     </tbody>
    </table>
   </div>
  </main>
 )
}