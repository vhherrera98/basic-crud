import { Pool } from 'pg';

let pool: Pool | null = null;

// fixed errors
// more changes
const conn = () => {
  if (!pool) {
    pool = new Pool({
   
      user: process.env.USER_PG,
      password: process.env.PASS_PG,
      host: process.env.HOST_PG,
      port: Number(process.env.PORT_PG),
      database: process.env.DB_PG,
      ssl: {
        rejectUnauthorized: false
      }
    });
    // pool = new Pool({
    //   user: 'postgres',
    //   password: 'password',
    //   host: 'localhost',
    //   port: 5433,
    //   database: 'tasksdb'
    // });
  }

  return pool;
}

export { conn };