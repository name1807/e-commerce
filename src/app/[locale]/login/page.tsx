"use server"

import { type JSX } from "react";

import LoginForm from "@/components/login/login-form";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function LoginPage(): Promise<JSX.Element> {
  const session = await getServerSession(authOptions)

  console.log(session)

  return (
    <div className="grid place-content-center h-screen">
      <LoginForm />
    </div>
  )
}
