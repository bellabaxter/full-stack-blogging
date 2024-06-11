import pg from "pg";
import 'dotenv/config';

export const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "blog",
    password: process.env.DB_KEY,
});