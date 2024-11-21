import { NextResponse } from "next/server";
import { conn } from "@/utils/database";

export async function PUT(req: Request, {
  params
}: { params: Promise<{ id: string }> }) {

  try {

    const id = (await params).id;

    const body = await req.json();
    const { title, description, is_active } = body;

    const query = "UPDATE tasks SET title = $1, description = $2, is_active = $3 WHERE id = $4 RETURNING *";
    const values = [title, description, is_active, id];

    const response = await conn().query(query, values);

    return NextResponse.json({
      status: "OK",
      message: 'La tarea ha sido modificada exitosamente!',
      data: response.rows[0]
    })
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      status: "ERROR",
      message: 'Error con el servidor',
      data: error
    })
  }
}

export async function DELETE(req: Request, {
  params
}: { params: Promise<{ id: string }> }) {

  try {

    const id = (await params).id;

    const query = "DELETE FROM tasks WHERE id = $1";
    const values = [id];

    const response = await conn().query(query, values);

    if (response.rowCount === null) {
      return NextResponse.json({
        status: "ERROR",
        message: 'La tarea no existe!',
        data: response.rows[0]
      })
    }

    return NextResponse.json({
      status: "OK",
      message: 'La tarea ha sido eliminada exitosamente!',
      data: response.rows[0]
    })

  } catch (error) {
    console.log(error)
    return NextResponse.json({
      status: "ERROR",
      message: 'Error con el servidor',
      data: error
    })
  }
}

export async function GET(request: Request, {
  params
}: { params: Promise<{ id: string }> }) {

  try {

    const id = (await params).id;

    const query = "SELECT * FROM tasks WHERE id = $1";
    const response = await conn().query(query, [id]);

    if (!response.rows[0]) {
      return NextResponse.json({
        status: "WARNING",
        message: 'La tasks no existe!',
        data: response.rows[0]
      });
    }

    return NextResponse.json({
      status: "OK",
      message: 'Tasks obtenidas exitosamente!',
      data: response.rows[0]
    });

  } catch (error) {
    return NextResponse.json({
      status: "ERROR",
      message: 'Error con el servidor!',
      data: error
    })
  }
}