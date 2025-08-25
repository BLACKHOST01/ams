// lib/db.ts
import { Pool } from "pg";
import { neon } from "@neondatabase/serverless";

let client: any;
let isNeon = false;

if (process.env.VERCEL) {
  client = neon(process.env.DATABASE_URL!);
  isNeon = true;
} else {
  client = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
}

export async function query(text: string, params?: any[]) {
  if (isNeon) {
    const rows = await client(text, params); // neon returns rows directly
    return { rows };                        // normalize shape
  } else {
    return await client.query(text, params); // pg already has .rows
  }
}
