// app/api/register/route.ts
import { NextResponse } from "next/server";
import pool from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, identifier, email, password, role } = body;

    // ✅ Basic validation
    if (!fullName || !identifier || !email || !password || !role) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    // ✅ Check if email already exists
    const emailCheck = await pool.query(
      "SELECT id FROM users WHERE email = $1 LIMIT 1",
      [email]
    );
    if (emailCheck.rows.length > 0) {
      return NextResponse.json(
        { error: "Email is already registered." },
        { status: 400 }
      );
    }

    // ✅ Check if identifier already exists
    const idCheck = await pool.query(
      "SELECT id FROM users WHERE identifier = $1 LIMIT 1",
      [identifier]
    );
    if (idCheck.rows.length > 0) {
      return NextResponse.json(
        { error: "This Student/Staff ID is already registered." },
        { status: 400 }
      );
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Insert into DB
    await pool.query(
      "INSERT INTO users (full_name, identifier, email, password, role) VALUES ($1, $2, $3, $4, $5)",
      [fullName, identifier, email, hashedPassword, role]
    );

    return NextResponse.json(
      { message: "Account created successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Registration error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
