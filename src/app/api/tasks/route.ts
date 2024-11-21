import { NextResponse } from "next/server";
import { conn } from "@/utils/database";

export async function POST(req: Request) {

  try {
    const body = await req.json();
    const { title, description } = body;

    console.log(body)

    const query = "INSERT INTO tasks(title, description, is_active) VALUES ($1, $2, $3) RETURNING *";
    const values = [title, description, true];

    const response = await conn().query(query, values);

    return NextResponse.json({
      status: "OK",
      message: 'La tarea ha sido guardada exitosamente!',
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

export async function GET() {

  // const createTableQuery = `
  //   CREATE TABLE IF NOT EXISTS tasks(
  //     id SERIAL PRIMARY KEY,
  //     title VARCHAR(100) NOT NULL,
  //     description TEXT NOT NULL,
  //     is_active BOOLEAN,
  //     created_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  //   );
  //   `

  // await conn().query(createTableQuery);

  try {

    const query = "SELECT * FROM tasks";
    const response = await conn().query(query);

    return NextResponse.json({
      status: "OK",
      message: 'Tasks obtenidas exitosamente!',
      data: response.rows
    });

  } catch (error) {
    return NextResponse.json({
      status: "ERROR",
      message: 'Error con el servidor!',
      data: error
    })
  }
}