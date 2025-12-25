import { NextRequest, NextResponse } from "next/server";
import createIntlMiddleware from 'next-intl/middleware';
import { getToken } from "next-auth/jwt";
import { locales, routing } from "./i18n/routing";
import { cookies, headers } from "next/headers";
import { join } from "path";

const intlMiddleware = createIntlMiddleware(routing);

export async function middleware(req: NextRequest) {
  const header = headers()
  const { pathname, search } = req.nextUrl;

  const localeFromHeader = (await header).get("x-next-intl-locale");
  const localeFromCookie = (await cookies()).get('NEXT_LOCALE')?.value;
  const localeFromPath = pathname.split("/")[1]
  const locale = localeFromCookie || localeFromHeader || localeFromPath || locales[0]

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const urlWithLocale = (path: string) => `/${locale}${path}`

  if (pathname === urlWithLocale("")) {
    return NextResponse.redirect(new URL(urlWithLocale("/home"), req.url));
  } else if (!token && pathname.startsWith(urlWithLocale("/profile"))) {
    return NextResponse.redirect(new URL(urlWithLocale("/login"), req.url));
  } else {
    return intlMiddleware(req)
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|apple-touch-icon.png|favicon.svg|images/books|icons|manifest).*)'
  ]
};