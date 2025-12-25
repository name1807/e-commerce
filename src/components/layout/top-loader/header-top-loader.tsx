"use client"

import NextTopLoader from 'nextjs-toploader'

export default function HeaderTopLoader() {
  return (
    <NextTopLoader
      showSpinner={false}
      color="#006FEE"
      height={3}
      shadow="0 0 10px rgba(79, 70, 229, 0.5)"
    />
  )
}
