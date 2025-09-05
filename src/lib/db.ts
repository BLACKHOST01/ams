// src/lib/db.ts
import { Pool } from "pg";

if (!process.env.DATABASE_URL) {
  throw new Error("❌ No DATABASE_URL provided in environment variables");
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
  connectionTimeoutMillis: 10000,
});

export async function query(text: string, params: any[] = []) {
  try {
    const result = await pool.query(text, params);
    return { rows: result.rows };
  } catch (err) {
    console.error("❌ DB query error:", err);
    throw err;
  }
}
console.log('This is the .env.development.local file to local db', process.env.DATABASE_URL);
console.log('DATABASE_URL:', process.env.DATABASE_URL);