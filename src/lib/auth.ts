// src/lib/auth.ts
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export function getUserFromToken() {
  const token = cookies().get("token")?.value;
  if (!token) return null;

  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as { id: string; email: string };
  } catch {
    return null;
  }
}
