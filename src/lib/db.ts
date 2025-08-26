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
      client = neon(process.env.DATABASE_URL); // Neon SQL client
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

export async function query(text: string, params: any[] = []) {
  const client = getClient();

  if (isNeon) {
    // Convert `$1, $2...` into Neon template literal with params
    // Example: "SELECT * FROM users WHERE email = $1 AND role = $2"
    const parts = text.split(/\$\d+/); // split on $1, $2...
    let sqlQuery = client``; // start with empty template literal

    parts.forEach((part, i) => {
      if (i < params.length) {
        sqlQuery = client`${sqlQuery}${part}${params[i]}`;
      } else {
        sqlQuery = client`${sqlQuery}${part}`;
      }
    });

    const rows = await sqlQuery;
    return { rows };
  } else {
    const result = await client.query(text, params);
    return result;
  }
}
