"use server"
import { type ReactNode } from 'react'
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

type I18nProviderProps = {
  children: ReactNode;
  locale: string;
}

export default async function I18nProvider({ children, locale }: I18nProviderProps) {
  const messages = await getMessages({ locale })

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      {children}
    </NextIntlClientProvider>
  )
}
