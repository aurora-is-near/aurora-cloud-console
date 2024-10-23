import { type CookieOptions, createServerClient } from "@supabase/ssr"
import { NextRequest, NextResponse } from "next/server"
import { Database } from "@/types/supabase"
import { COMMON_SERVER_OPTIONS } from "./common-options"

export const createMiddlewareClient = (req: NextRequest) => {
  let response = NextResponse.next({
    request: {
      headers: req.headers,
    },
  })

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      ...COMMON_SERVER_OPTIONS,
      cookies: {
        get(name: string) {
          return req.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          req.cookies.set({
            name,
            value,
            ...options,
          })

          response = NextResponse.next({
            request: {
              headers: req.headers,
            },
          })

          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          req.cookies.set({
            name,
            value: "",
            ...options,
          })

          response = NextResponse.next({
            request: {
              headers: req.headers,
            },
          })

          response.cookies.set({
            name,
            value: "",
            ...options,
          })
        },
      },
    },
  )
}
