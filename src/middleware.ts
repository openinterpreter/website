import { NextRequest, NextResponse } from "next/server";

const LEGACY_REDIRECTS: Record<string, string> = {
  "/about": "/",
  "/blog/first-post": "/blog#new-knowledge-worker",
  "/blog/second-post": "/blog#next-generation",
  "/cli": "/",
  "/events": "/",
  "/launch": "/",
  "/tool-standard": "/",
};

export function middleware(request: NextRequest) {
  const destination = LEGACY_REDIRECTS[request.nextUrl.pathname];

  if (!destination) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL(destination, request.url), 308);
}

export const config = {
  matcher: [
    "/about",
    "/blog/first-post",
    "/blog/second-post",
    "/cli",
    "/events",
    "/launch",
    "/tool-standard",
  ],
};
