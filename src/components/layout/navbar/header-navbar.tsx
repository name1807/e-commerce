"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/routing";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import NextLink from "next/link";
import ChangingLocaleButton from "@/components/common/button/changing-locale-button";
import ChangingThemeButton from "@/components/common/button/changing-theme-button";

export default function HeaderNavbar() {
  const router = useRouter()
  const { data: session } = useSession()
  const pathname = usePathname()
  const t = useTranslations("Components.Layout.Navbar.HeaderNavbar");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menus = [
    {
      label: t("Menu.Home"),
      href: "/home",
    },
    {
      label: t("Menu.About"),
      href: "/about",
    },
    {
      label: t("Menu.Profile"),
      href: "/profile/1",
    },
  ]

  const handlePressLogout = () => {
    signOut({
      redirect: false
    })

    router.push("/login")
  }

  return (
    <Navbar
      className="bg-background"
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="full"
      isBordered
      shouldHideOnScroll
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <p className="font-bold text-inherit hidden sm:block">E - COMMERCD</p>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menus.map((item, index) => {

          const isActive = pathname.startsWith(item.href)

          return <NavbarItem key={index}>
            <Link
              as={NextLink}
              className="w-full"
              color={isActive ? "primary" : "foreground"}
              href={item.href}
              size="sm"
            >
              {item.label}
            </Link>
          </NavbarItem>
        })}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <ChangingThemeButton />
        </NavbarItem>
        <NavbarItem>
          <ChangingLocaleButton />
        </NavbarItem>
        {!!session ?
          <>
            <NavbarItem>
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Avatar
                    as="button"
                    className="transition-transform"
                    color="primary"
                    name={session.user.name.charAt(0).toUpperCase()}
                    size="sm"
                    src={!!session.user.image ? session.user.image : undefined}
                    isBordered
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  <DropdownItem key="profile" className="h-14 gap-2">
                    <p>{session.user.name}</p>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400">{session.user.email}</p>
                  </DropdownItem>
                  <DropdownItem key="logout" color="danger" className="text-danger" onPress={handlePressLogout}>
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarItem>
          </>
          :
          <>
            <NavbarItem className="hidden lg:flex">
              <Link as={NextLink} href="/login">
                {t("Login")}
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Button as={NextLink} color="primary" href="/sign-up" variant="flat">
                {t("SignUp")}
              </Button>
            </NavbarItem>
          </>
        }
      </NavbarContent>
      <NavbarMenu>
        {menus.map((item, index) => {
          const isActive = pathname === item.href

          return <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              as={NextLink}
              className="w-full"
              color={
                isActive ? "primary" : "foreground"
              }
              href={item.href}
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        })}
      </NavbarMenu>
    </Navbar>
  );
}

