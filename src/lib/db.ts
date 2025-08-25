import { Pool } from "pg";
import { neon } from "@neondatabase/serverless";

// Decide which client to use
let client: any;
let isNeon = false;

if (process.env.VERCEL) {
  // Running on Vercel → use Neon
  client = neon(process.env.DATABASE_URL!);
  isNeon = true;
} else {
  // Running locally → use pg Pool
  client = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: false, // local dev usually doesn't use SSL
  });
}

// Unified query function
export async function query(text: string, params?: any[]) {
  if (isNeon) {
    // Convert $1, $2 placeholders into actual params for Neon
    return await client(text, params);
  } else {
    return await client.query(text, params);
  }
}
