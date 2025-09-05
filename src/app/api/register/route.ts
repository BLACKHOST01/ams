// app/api/register/route.ts
import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import bcrypt from "bcryptjs";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, identifier, email, password, role } = body;

    if (!fullName || !identifier || !email || !password || !role) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    // 🔍 Check if user already exists
    const existing = await query(
      process.env.DATABASE_URL?.includes("vercel")
        ? `SELECT * FROM users WHERE email = '${email}' OR identifier = '${identifier}' LIMIT 1`
        : "SELECT * FROM users WHERE email = $1 OR identifier = $2 LIMIT 1",
      process.env.DATABASE_URL?.includes("vercel") ? [] : [email, identifier]
    );

    if (existing.rows.length > 0) {
      return NextResponse.json({ error: "User already exists." }, { status: 400 });
    }

    // 🔐 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 📝 Insert new user
    const result = await query(
      process.env.DATABASE_URL?.includes("vercel")
        ? `INSERT INTO users (full_name, identifier, email, password, role)
           VALUES ('${fullName}', '${identifier}', '${email}', '${hashedPassword}', '${role}')
           RETURNING id, full_name, identifier, email, role`
        : `INSERT INTO users (full_name, identifier, email, password, role)
           VALUES ($1, $2, $3, $4, $5)
           RETURNING id, full_name, identifier, email, role`,
      process.env.DATABASE_URL?.includes("vercel") ? [] : [fullName, identifier, email, hashedPassword, role]
    );

    const user = result.rows[0];

    return NextResponse.json(
      {
        message: "User registered successfully",
        user,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("❌ Register error:", err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
