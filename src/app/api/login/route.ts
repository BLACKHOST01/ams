// app/api/login/route.ts
import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import bcrypt from "bcryptjs";   // ✅ use bcryptjs instead

export const runtime = "nodejs"; // ✅ force Node runtime (not Edge)

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // 🔍 Find user by email OR identifier
    const result = await query(
      "SELECT * FROM users WHERE email = $1 OR identifier = $1 LIMIT 1",
      [email]
    );

    if (!result.rows || result.rows.length === 0) {
      return NextResponse.json({ error: "User not found." }, { status: 400 });
    }

    const user = result.rows[0];

    // 🔐 Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
    }

    // ✅ Success
    return NextResponse.json({
      message: "Login successful",
      user: {
        id: user.id,
        fullName: user.full_name,
        identifier: user.identifier,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("❌ Login error:", err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
