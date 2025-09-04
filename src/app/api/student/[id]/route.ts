// src/app/api/student/[id]/route.ts
import { NextResponse } from "next/server";
import { query } from "@/lib/db";
export const runtime = 'nodejs';


export async function GET(
  req: Request,
  context: { params: { id: string } }
) {
  // You MUST await params first
  const { params } = await context;
  const { id } = await params;

  try {
    const result = await query(
      `SELECT id, full_name, identifier, email, role
       FROM users
       WHERE identifier = $1 AND role = 'student'
       LIMIT 1`,
      [id]
    );

    if (!result.rows || result.rows.length === 0) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    return NextResponse.json(result.rows[0], { status: 200 });
  } catch (err) {
    console.error("❌ Student profile error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
