import { Pool } from "pg";
import { neon } from "@neondatabase/serverless";

let client: any;
let isNeon = false;

export function getClient() {
  if (!client) {
    if (process.env.VERCEL) {
      if (!process.env.DATABASE_URL) {
        throw new Error("❌ DATABASE_URL not set in environment variables");
      }
      client = neon(process.env.DATABASE_URL);
      isNeon = true;
    } else {
      client = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
      });
    }
  }
  return client;
}

export async function query(text: string, params?: any[]) {
  const client = getClient();
  if (isNeon) {
    const rows = await client(text, params); // neon returns array
    return { rows };
  } else {
    return await client.query(text, params);
  }
}
