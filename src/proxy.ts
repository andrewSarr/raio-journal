import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME, verifySessionToken } from "@/lib/session";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Admin auth gate. "/admin" (bare) needs its own check — a prefix match
  // on "/admin/" alone misses the dashboard root.
  const isAdminRoute = pathname === "/admin" || pathname.startsWith("/admin/");
  const isLoginRoute = pathname === "/admin/login";
  if (isAdminRoute && !isLoginRoute) {
    const token = req.cookies.get(COOKIE_NAME)?.value;
    const valid = await verifySessionToken(token);
    if (!valid) {
      const loginUrl = new URL("/admin/login", req.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Locale for the root layout's <html lang>, forwarded as a request header
  // since the layout is shared (no [locale] segment) — see src/lib/i18n.ts.
  const locale = pathname === "/fr" || pathname.startsWith("/fr/") ? "fr" : "en";
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-locale", locale);

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon\\.ico|icon\\.svg).*)"],
};
