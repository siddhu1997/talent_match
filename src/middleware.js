import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const PUBLIC_ROUTES = ["/login", "/signup", "/about", "/"]; // adjust as needed

export function middleware(request) {
  const session = request.cookies.get("session")?.value;
  const { pathname } = request.nextUrl;

  // Allow public routes
  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  // Protect all other routes
  if (!session) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
export const config = {
  matcher: [
    "/((?!_next|api|favicon.ico|robots.txt).*)", // Exclude Next.js internals and static files
  ],
};