import { NextRequest, NextResponse } from "next/server";

import { COOKIES_KEYS } from "@/config-global";

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get(COOKIES_KEYS.session)?.value;
  const user = request.cookies.get(COOKIES_KEYS.user)?.value;

  if (session && user) {
    const res = NextResponse.next();
    return res;
  }

  // Add the original URL as a query parameter
  const loginUrl = new URL("/auth/jwt/login", request.url);
  loginUrl.searchParams.set("returnTo", request.url);
  return NextResponse.redirect(loginUrl);
}
