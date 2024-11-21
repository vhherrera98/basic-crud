import { NextResponse } from "next/server";
import { conn } from "@/utils/database";
// import Cookies from 'js-cookie';

export async function POST(req: Request) {

  try {
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users(
      id SERIAL PRIMARY KEY,
      fullname VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL,
      password_hash TEXT NOT NULL,
      created_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
    `

    await conn().query(createTableQuery);


    const body = await req.json();
    const { email, password_hash } = body;

    const result = await conn().query('SELECT * FROM users WHERE email = $1', [email]);
    const exists = result.rows[0];

    if (!exists) {
      return NextResponse.json({
        status: 'WARNING',
        message: 'The credentials are incorrect'
      })
    }

    if (exists.password_hash !== password_hash) {
      return NextResponse.json({
        status: 'WARNING',
        message: 'The credentials are incorrect'
      })
    }

    // Cookies.set('token', JSON.stringify(exists), { secure: true, sameSite: 'strict' });

    return NextResponse.json({
      status: "OK",
      message: 'Signin successfully!',
      data: exists
    });
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      status: "ERROR",
      message: 'Error en el servidor!',
      data: error
    })
  }
}
