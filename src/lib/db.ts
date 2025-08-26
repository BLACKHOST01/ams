// lib/db.ts
import { Pool } from "pg";
import { neon, neonConfig } from "@neondatabase/serverless";

let isNeon = !!process.env.VERCEL;
let client: any = null;

if (isNeon) {
  neonConfig.fetchConnectionCache = true;
  client = neon(process.env.DATABASE_URL!);
} else {
  client = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
}

export async function query(text: string, params: any[] = []) {
  if (isNeon) {
    // ✅ Use .query for $1 placeholders
    const result = await client.query(text, params);
    return { rows: result.rows };
  } else {
    return client.query(text, params);
  }
}
