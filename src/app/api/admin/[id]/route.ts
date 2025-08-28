import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    const result = await query(
      `SELECT id, full_name, identifier, email, role
       FROM users
       WHERE identifier = $1 AND role = 'admin'`,
      [id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Admin not found" }, { status: 404 });
    }

    return NextResponse.json(result.rows[0], { status: 200 });
  } catch (err) {
    console.error("❌ Admin profile error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
