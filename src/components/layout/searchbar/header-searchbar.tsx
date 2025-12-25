"use client"

import { Input, Navbar, NavbarContent, NavbarItem } from "@heroui/react"
import { SearchIcon } from "lucide-react"

export default function HeaderSearchbar() {
  return (
    <Navbar className="z-0">
      <NavbarContent justify="center">
        <NavbarItem>
          <Input
            className="w- max-w-[32em]"
            placeholder="search"
            startContent={
              <SearchIcon />
            }
            type="text"
          />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
