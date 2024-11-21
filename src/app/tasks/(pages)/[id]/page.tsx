export const dynamic = 'force-dynamic';

import { IResponse, ITask } from "@/interfaces";
import { TaskForm } from "../../_components/Task.form";

interface IProps extends IResponse {
 data: ITask
}

async function fetching(id: string): Promise<IProps> {
 const response = await fetch(`${process.env.PATHNAME}/tasks/${id}`);
 const result = await response.json();
 return result
}


export default async function PageTaskID({ params }: { params: Promise<{ id: string }> }) {

 const slug = (await params).id;
 const users = fetching(slug);
 const [response] = await Promise.all([users])

 if (response.status !== "OK") {
  return (
   <main className="container mx-auto py-10 px-10 md:px-0">
    <section className="flex flex-col gap-5">
     <h1 className="text-2xl font-bold text-gray-800 text-center">LA TAREA NO EXISTE!</h1>
    </section>
   </main>
  )
 }

 return (
  <main className="container mx-auto py-10 px-10 md:px-0">
   <section className="flex flex-col gap-5">
    <h1 className="text-2xl font-bold text-gray-800 text-center">Modificar tarea: <span className="text-blue-600">{slug}</span></h1>
    <TaskForm data={response.data} path={`${process.env.PATHNAME}`} />
   </section>
  </main>
 )
}