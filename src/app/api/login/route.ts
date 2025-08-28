// src/app/api/login/route.ts
import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // 🔍 Find user by email or identifier
    const result = await query(
      "SELECT * FROM users WHERE email = $1 OR identifier = $1 LIMIT 1",
      [email]
    );

    if (!result.rows || result.rows.length === 0) {
      return NextResponse.json({ error: "User not found." }, { status: 400 });
    }

    const user = result.rows[0];

    // 🔐 Validate password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
    }

    // 🎫 Create JWT
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        identifier: user.identifier,
        role: user.role,
      },
      process.env.JWT_SECRET as string, // ✅ loaded from .env.local
      { expiresIn: "1h" }
    );

    // 🍪 Send JWT in cookie
    const response = NextResponse.json({
      message: "Login successful",
      user: {
        id: user.id,
        fullName: user.full_name,
        identifier: user.identifier,
        email: user.email,
        role: user.role,
      },
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60, // 1 hour
    });

    return response;
  } catch (err) {
    console.error("❌ Login error:", err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
