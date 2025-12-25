import { notFound } from 'next/navigation';
import { getRequestConfig, type GetRequestConfigParams, type RequestConfig } from 'next-intl/server';
import { locales } from './routing';
import { cookies, headers } from 'next/headers';

export default getRequestConfig(async ({ locale: localeFromParam }: GetRequestConfigParams): Promise<RequestConfig> => {
    const header = headers();
    const localeFromHeader = (await header).get("x-next-intl-locale");
    const localeFromCookie = (await cookies()).get('NEXT_LOCALE')?.value;
    const locale = localeFromParam || localeFromCookie || localeFromHeader || locales[0]

    if (!locales.includes(locale as any)) notFound()

    const requestConfig: RequestConfig = {
        messages: (await import(`@/messages/${locale}.json`)).default,
        locale,
    }

    return requestConfig;
});