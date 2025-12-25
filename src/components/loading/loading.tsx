"use client"

import { Spinner } from "@heroui/react"

export default function Loading() {
  return (
    <div className="grid place-content-center h-screen">
      <Spinner />
    </div>
  )
}
