"use client"
import { type ReactNode } from 'react'
import { ThemeProvider as NextThemesProvider } from "next-themes"

type ThemeProviderProps = {
  children: ReactNode
}

export default function ThemeProvider({ children }: ThemeProviderProps) {

  return (
    <NextThemesProvider defaultTheme='system' attribute='class'>
      {children}
    </NextThemesProvider>
  )
}
