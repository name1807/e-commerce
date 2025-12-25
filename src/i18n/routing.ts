import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const locales = ['th', 'en'] as const;

export const routing = defineRouting({
  locales,
  defaultLocale: locales[0],
});

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);