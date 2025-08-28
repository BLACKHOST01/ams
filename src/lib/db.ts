// src/lib/db.ts
import { Pool } from "pg";
import { neon, neonConfig } from "@neondatabase/serverless";

const isProd = process.env.NODE_ENV === "production";
const isVercel = !!process.env.VERCEL;

const localUrl = process.env.LOCAL_DATABASE_URL;
const neonUrl = process.env.NEON_DATABASE_URL;

if (!localUrl && !neonUrl) {
  throw new Error("❌ No database URL provided in environment variables");
}

// Configure Neon fetch caching (important for serverless)
if (isVercel || isProd) {
  neonConfig.fetchConnectionCache = true;
}

let queryFn: (text: string, params?: any[]) => Promise<any>;

if (isVercel || isProd) {
  // Production → use Neon
  const neonClient = neon(neonUrl!);
  queryFn = async (text, params = []) => {
    const result = await neonClient(text, params);
    return { rows: result.rows };
  };
} else {
  // Development → use local Postgres
  const pool = new Pool({
    connectionString: localUrl!,
    ssl: false, // local DB usually doesn't need SSL
    connectionTimeoutMillis: 10000,
  });

  queryFn = async (text, params = []) => {
    const result = await pool.query(text, params);
    return { rows: result.rows };
  };
}

export async function query(text: string, params: any[] = []) {
  try {
    return await queryFn(text, params);
  } catch (err) {
    console.error("❌ DB query error:", err);
    throw err;
  }
}
