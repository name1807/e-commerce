"use client"
import { useEffect, useState } from 'react'
import { useTheme } from "next-themes"

import { Button } from '@heroui/react'

import { MoonIcon, SunIcon } from 'lucide-react'

export default function ChangingThemeButton() {
  const [mounted, setMounted] = useState(false)
  const { theme, systemTheme, setTheme } = useTheme()
  const currentTheme = theme === "system" ? systemTheme : theme

  useEffect(() => {
    setMounted(true)
  }, [])

  const handlePress = () => {
    setTheme(currentTheme === "dark" ? "light" : "dark")
  }

  return (
    <Button
      onPress={handlePress}
      variant="bordered"
      isIconOnly
      isLoading={!mounted}
      className='bg-background'
    >
      {currentTheme === "dark" ? <SunIcon size={20} /> : <MoonIcon size={20} />}
    </Button>
  )
}
