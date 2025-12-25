"use client"
import { useState } from "react"
import { useTranslations } from "next-intl"
import { useForm } from "@tanstack/react-form"
import { z } from "zod"
import { useRouter, useSearchParams } from "next/navigation"
import { signIn } from "next-auth/react"

import { Button, Input, Link } from "@heroui/react"
import NextLink from "next/link"
import { addToast } from "@heroui/react";


const LoginSchema = z.object({
  email: z
    .string()
    .email("InvalidEmail"),
  password: z.string().min(1, "EmptyPassword"),
})

export default function LoginForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [IsLoading, setIsLoading] = useState(false)
  const t = useTranslations("Components.Login.LoginForm")
  const form = useForm({
    defaultValues: {
      email: "",
      password: ""
    },
    validators: {
      onChange: LoginSchema
    },
    async onSubmit({ value }) {
      setIsLoading(true)
      const signInRes = await signIn("credentials", {
        email: value.email,
        password: value.password,
        redirect: false
      })
      setIsLoading(false)

      if (!signInRes || !signInRes.ok) {
        addToast({
          "title": t("LoginError"),
          "color": "danger"
        })
        return
      }

      const callbackUrl = searchParams.get("callbackUrl");

      router.push(!!callbackUrl ? decodeURIComponent(callbackUrl) : "/home");

      router.push("/home")
    }
  })

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        event.stopPropagation()
        form.handleSubmit()
      }}
      className="space-y-[32px] w-[320px]"
      noValidate
    >
      <div className="space-y-[16px]">
        <form.Field
          name="email"
          children={(field) => (
            <Input
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(event) => field.handleChange(event.target.value)}
              label={t("Email")}
              type="email"
              size="sm"
              isInvalid={field.state.meta.isTouched && !field.state.meta.isValid}
              errorMessage={field.state.meta.errors.map((err: any) => t(err.message)).join(',')}
            />
          )}
        />
        <form.Field
          name="password"
          children={(field) => (
            <Input
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(event) => field.handleChange(event.target.value)}
              label={t("Password")}
              type="password"
              size="sm"
              isInvalid={field.state.meta.isTouched && !field.state.meta.isValid}
              errorMessage={field.state.meta.errors.map((err: any) => t(err.message)).join(',')}
            />
          )}
        />
      </div>
      <div className="space-y-[16px]">
        <form.Subscribe
          children={() => (
            <Button type="submit" color="primary" fullWidth isLoading={IsLoading}>
              {t("Login")}
            </Button>
          )}
        />
        <div>
          <p className="text-sm">
            {t("SignUpDescription")}
            <Link as={NextLink} href="/sign-up">
              {t("SignUp")}
            </Link>
          </p>
        </div>
      </div>
    </form>
  )
}
