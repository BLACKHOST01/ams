// app/api/register/route.ts
import { NextResponse } from "next/server";
import pool from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const { fullName, identifier, email, password, role } = await req.json();

    // ✅ Validate input
    if (!fullName || !identifier || !email || !password || !role) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // ✅ Check if user exists
    const existing = await pool.query(
      "SELECT * FROM users WHERE identifier = $1 OR email = $2",
      [identifier, email]
    );
    if (existing.rows.length > 0) {
      return NextResponse.json(
        { error: "User with this email or ID already exists" },
        { status: 400 }
      );
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Insert new user
    const result = await pool.query(
      `INSERT INTO users (full_name, identifier, email, password, role)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, full_name, email, role`,
      [fullName, identifier, email, hashedPassword, role]
    );

    return NextResponse.json(
      { message: "User created successfully", user: result.rows[0] },
      { status: 201 }
    );
  } catch (err) {
    console.error("Register error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
