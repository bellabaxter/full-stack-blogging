import pg from "pg";
import 'dotenv/config';

// export const db = new pg.Client({
//     user: "postgres",
//     host: "localhost",
//     database: "blog",
//     password: process.env.DB_KEY,
// });

export const db = new pg.Client({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false, // Use this option if your database server requires SSL
  },
})

db.connect()
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Database connection error:", err));