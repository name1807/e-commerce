import { type ReactNode, type JSX } from 'react'

import HeaderNavbar from '@/components/layout/navbar/header-navbar'

type WithNavbarlayout = {
  children: ReactNode
}

export default async function WithNavbarlayout({ children }: WithNavbarlayout): Promise<JSX.Element> {
  return (
    <div className='h-screen'>
      <HeaderNavbar />
      <main className='flex flex-col items-center'>
        {children}
      </main>
    </div>
  )
}
