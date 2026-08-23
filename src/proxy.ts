import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME, verifySessionToken } from "@/lib/session";

export async function proxy(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  const valid = await verifySessionToken(token);

  if (!valid) {
    const loginUrl = new URL("/admin/login", req.url);
    loginUrl.searchParams.set("from", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  // "/admin" (bare) needs its own entry — "/admin/((?!login).*)" only
  // matches paths with a segment AFTER /admin/, so the dashboard root was
  // slipping through unauthenticated.
  matcher: ["/admin", "/admin/((?!login).*)"],
};
