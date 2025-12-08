import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Temporarily disable Sentient University (SU) dashboards by redirecting
// student/teacher/admin routes to the Fintech dashboard. Remove this file
// to re-enable SU, or adjust the matcher/target as needed.
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  // Allow API/static/_next paths to pass through
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/assets")
  ) {
    return NextResponse.next();
  }
  const target = "/fintech-dashboard";
  const url = req.nextUrl.clone();
  url.pathname = target;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/student/:path*", "/teacher/:path*", "/admin/:path*"],
};




