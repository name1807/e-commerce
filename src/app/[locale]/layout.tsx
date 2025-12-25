import type { Metadata } from "next";
import { type ReactNode, type JSX, Suspense } from "react";

import { getServerSession } from "next-auth";
import { Kanit } from "next/font/google";
import { twMerge } from "tailwind-merge";

import { authOptions } from "../api/auth/[...nextauth]/route";

import I18nProvider from "@/providers/i18n-provider";
import ThemeProvider from "@/providers/theme-provider";
import ScrollToTopButton from "@/components/common/button/scroll-to-top-button";
import HeaderTopLoader from "@/components/layout/top-loader/header-top-loader";
import AuthProvider from "@/providers/auth-provider";
import { ToastProvider } from "@heroui/toast";

import "@/styles/globals.css";
import Loading from "@/components/loading/loading";

const kanit = Kanit({
  variable: "--font-kanit",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})

export const metadata: Metadata = {
  title: "E commerce tutorial",
  description: "just a tutorial for e-commerce",
};

type LocaleLayoutProps = Readonly<{
  children: ReactNode;
  params: { locale: string }
}>;

export default async function LocaleLayout({ children, params }: LocaleLayoutProps): Promise<JSX.Element> {
  const { locale } = await params;
  const session = await getServerSession(authOptions);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={twMerge("min-h-screen min-w-[375px] antialiased", kanit.variable)}
      >
        <ThemeProvider>
          <Suspense fallback={<Loading />}>
            <I18nProvider locale={locale}>
              <AuthProvider session={session}>
                {children}
                <HeaderTopLoader />
                <ScrollToTopButton />
                <ToastProvider />
              </AuthProvider>
            </I18nProvider>
          </Suspense>
        </ThemeProvider>
      </body>
    </html >
  );
}
