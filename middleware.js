import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

const isProtectedRoute = (path) => {
  const protectedPaths = [
    "/dashboard",
    "/resume",
    "/interview",
    "/ai-cover-letter",
    "/onboard"
  ];
  return protectedPaths.some(protectedPath => path.startsWith(protectedPath));
};

export default authMiddleware({
  publicRoutes: ["/", "/api/webhook/clerk"],
  afterAuth(auth, req) {
    const { userId } = auth;
    const path = req.nextUrl.pathname;

    if (!userId && isProtectedRoute(path)) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }

    return NextResponse.next();
  }
});

export const config = {
  matcher: [
    // Match all pages except static files and Next.js internals
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:css|js|json|jpg|jpeg|png|gif|svg|woff2?|ttf|ico)).*)",
    // Protect API routes
    "/api/(.*)",
  ],
};
