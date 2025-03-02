import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth/auth.config";
import { API_AUTH_PREFIX, PUBLIC_ROUTES, PROTECTED_ROUTES } from "@/lib/route";

export const { auth } = NextAuth(authOptions);

export default auth((req: any) => {
  const pathname = req.nextUrl.pathname;

  // manage route protection
  const isAuth = !!req.auth;

  // Check for API auth routes first
  const isAccessingApiAuthRoute = pathname.startsWith(API_AUTH_PREFIX);
  if (isAccessingApiAuthRoute) return NextResponse.next();

  // Check for public routes
  const isAccessingPublicRoute = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  const isAccessingProtectedRoute = PROTECTED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  // Redirect authenticated users trying to access login page to dashboard
  if (isAuth && isAccessingPublicRoute && pathname !== "/") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (isAuth || isAccessingPublicRoute) return NextResponse.next();

  return NextResponse.redirect(new URL("/login", req.url));
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
