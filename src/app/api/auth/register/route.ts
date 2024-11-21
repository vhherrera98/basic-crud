import { NextResponse } from "next/server";
import { conn } from "@/utils/database";

export async function POST(req: Request) {

  try {

    // const createTableQuery = `
    // CREATE TABLE IF NOT EXISTS users(
    //   id SERIAL PRIMARY KEY,
    //   fullname VARCHAR(100) NOT NULL,
    //   email VARCHAR(100) NOT NULL,
    //   password_hash TEXT NOT NULL,
    //   created_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    // );
    // `

    // await conn().query(createTableQuery);

    const body = await req.json();
    const { fullname, email, password_hash } = body;

    const result = await conn().query('SELECT EXISTS(SELECT 1 FROM users WHERE email = $1)', [email]);
    const exists = result.rows[0].exists;

    if (exists) {
      return NextResponse.json({
        status: 'WARNING',
        message: 'User already exists'
      })
    }

    const query = "INSERT INTO users(fullname, email, password_hash) VALUES ($1, $2, $3) RETURNING *";
    const values = [fullname, email, password_hash];

    const response = await conn().query(query, values);

    return NextResponse.json({
      status: "OK",
      message: 'User register!',
      data: response.rows[0]
    })
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      status: "ERROR",
      message: 'Error en el servidor!',
      data: error
    })
  }
}
