"use client"
import { type Key } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';

import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react';
import { locales, usePathname } from '@/i18n/routing';

import { GlobeIcon } from 'lucide-react';

export default function ChangingLocaleButton() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations('Components.Common.Button.ChangingLocaleButton');


  const handleAction = (locale: Key) => {
    if (!locales.includes(locale as any)) return;

    const params = new URLSearchParams(searchParams.toString());

    router.push(`/${locale}${pathname}?${params}`);
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          variant="bordered"
          isIconOnly
          className='bg-background'
        >
          <GlobeIcon size={20} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions" onAction={handleAction}>
        {locales.map((locale) => (
          <DropdownItem key={locale}>{t(locale)}</DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}
