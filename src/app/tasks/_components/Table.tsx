/* eslint-disable @typescript-eslint/no-explicit-any */
interface DataObject {
 [key: string]: any;
}

interface IProps {
 columns: {
  Header: string;
  accessor: string;
 }[];
 data: DataObject[]
}

export function Table({ columns, data }: IProps) {
 return (
  <div className="overflow-x-auto">
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
     {data.map((row, rowIndex) => (
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
     ))}
    </tbody>
   </table>
  </div>
 );
}