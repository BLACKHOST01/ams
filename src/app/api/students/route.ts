import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    const result = await query(
      `SELECT u.id, u.full_name, u.email,
              ARRAY(
                SELECT course_code
                FROM student_courses sc
                WHERE sc.student_id = u.id
              ) AS courses
       FROM users u
       WHERE u.role = 'student'
       ORDER BY u.full_name`
    );

    // Make sure to return the array directly
    return NextResponse.json(result.rows || []);
  } catch (err) {
    console.error("❌ Student API error:", err);
    return NextResponse.json([], { status: 500 });
  }
}
