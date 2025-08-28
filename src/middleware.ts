// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  // Redirect if no token
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
      email: string;
      role: string;
    };

    // 🔄 Attach user to request (optional)
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-user-id", decoded.id);
    requestHeaders.set("x-user-role", decoded.role);

    return NextResponse.next({ request: { headers: requestHeaders } });
  } catch (err) {
    console.error("❌ Invalid token:", err);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

// ✅ Protect specific routes
export const config = {
  matcher: ["/student/:path*", "/dashboard/:path*", "/admin/:path*"], // adjust paths to protect
};
