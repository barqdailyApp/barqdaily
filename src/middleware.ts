import { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";

export default async function middleware(request: NextRequest) {
  request.headers.set("Accept-Language", "ar");

  const handleI18nRouting = createMiddleware({
    locales: ["ar", "en"],
    defaultLocale: "ar",
  });
  const response = handleI18nRouting(request);
  return response;
}

export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the root
    "/",

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    "/(ar|en)/:path*",

    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    "/((?!_next|_vercel|.*\\..*).*)",
  ],
};
