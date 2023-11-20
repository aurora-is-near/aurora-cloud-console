import { NextRequest, NextResponse } from "next/server"
import { adminSupabase } from "@/utils/supabase"
import { ApiRequestContext, apiRequestHandler } from "@/utils/api"

export const PATCH = apiRequestHandler(
  ["admin"],
  async (req: NextRequest, ctx: ApiRequestContext) => {
    const { name } = await req.json()
    const supabase = adminSupabase()
    const { error } = await supabase
      .from("users")
      .update({ name })
      .eq("user_id", ctx.user.user_id)

    if (error) throw error

    return NextResponse.json({ status: "OK" })
  },
)

export const POST = apiRequestHandler(
  ["admin"],
  async (req: NextRequest, ctx: ApiRequestContext) => {
    const { user } = ctx
    const { email, name } = await req.json()
    const cleanedEmail = email.toLowerCase().trim()
    const supabase = adminSupabase()

    const { data: existingUser } = await supabase
      .from("users")
      .select("id")
      .ilike("email", `%${cleanedEmail}%`)
      .maybeSingle()

    if (existingUser) throw new Error("User already exists.")

    const { error } = await supabase.auth.admin.inviteUserByEmail(email, {
      data: { name, companyId: user.company_id },
    })

    if (error) throw error

    return NextResponse.json({ status: "OK" })
  },
)
