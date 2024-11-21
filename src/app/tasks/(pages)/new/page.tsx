import { TaskForm } from "../../_components/Task.form";

export default function PageNewTask() {
 return (
  <main className="container mx-auto py-10 px-10 md:px-0">
   <section className="flex flex-col gap-5">
    <h1 className="text-2xl font-bold text-gray-800 text-center">Crear una nueva tarea</h1>
    <TaskForm path={`${process.env.PATHNAME}`} />
   </section>
  </main>
 )
}