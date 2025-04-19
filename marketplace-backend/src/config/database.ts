import pg from "pg";
import { verifyEnv } from "./env.js";

const { Pool } = pg;

verifyEnv();

export const pool = new Pool({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT!),
  database: process.env.POSTGRES_DB,
  query_timeout: parseInt(process.env.POSTGRES_QUERY_TIMEOUT!),
});

export const checkDatabaseConnection = async () => {
  try {
    const client = await pool.connect();
    await client.query("SELECT NOW()");
    client.release();
    console.log("Database connected successfully");
    return true;
  } catch (error) {
    console.error("Database connection error:", error);
    return false;
  }
};
