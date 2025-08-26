// lib/db.ts
import { Pool } from "pg";
import { neon } from "@neondatabase/serverless";

const isNeon = !!process.env.VERCEL; // Detect Vercel env

let pool: Pool | null = null;
let neonClient: any = null;

if (isNeon) {
  neonClient = neon(process.env.DATABASE_URL!);
} else {
  pool = new Pool({ connectionString: process.env.DATABASE_URL });
}

/**
 * Unified query function
 * Always call it with `query("SELECT ... WHERE id = $1", [id])`
 */
export async function query(sql: string, params: any[] = []) {
  if (isNeon) {
    // 🚀 Convert `$1, $2...` to interpolated values for Neon
    let finalSQL = sql;
    params.forEach((p, i) => {
      const value =
        typeof p === "string" ? `'${p.replace(/'/g, "''")}'` : p; // escape strings
      finalSQL = finalSQL.replace(new RegExp(`\\$${i + 1}`, "g"), value);
    });

    const rows = await neonClient(finalSQL);
    return { rows };
  } else {
    // Local dev with pg
    return pool!.query(sql, params);
  }
}
