// src/app/api/db-test/route.ts
import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    const { rows } = await query("SELECT NOW()");
    return NextResponse.json({ success: true, now: rows[0].now });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
