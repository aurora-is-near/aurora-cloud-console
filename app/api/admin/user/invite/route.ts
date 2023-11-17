import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { NextRequest, NextResponse } from "next/server"
import { adminSupabase } from "@/utils/supabase"
import { cookies } from "next/headers"

export async function POST(req: NextRequest) {
  try {
    let { email, name } = await req.json()
    email = email.toLowerCase().trim()

    const supabase = createRouteHandlerClient({ cookies })
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) throw new Error("User not found.")

    const { data: existingUser } = await adminSupabase()
      .from("users")
      .select("id")
      .eq("email", email)
      .maybeSingle()

    if (existingUser) throw new Error("User already exists.")

    const { data: companyData, error: companyError } = await adminSupabase()
      .from("users")
      .select("companies(id)")
      .eq("user_id", user.id)
      .limit(1)
      .single()

    if (companyError) throw companyError

    const companyId = companyData?.companies?.id

    const { data, error } = await adminSupabase().auth.admin.inviteUserByEmail(
      email,
      {
        data: { name, companyId },
      },
    )

    console.log(data, error)

    if (error) throw error

    return NextResponse.json({ message: "User invited." }, { status: 200 })
  } catch (error: any) {
    console.log(error)
    return NextResponse.json(
      { message: error.message || "Something went wrong. Please try again." },
      { status: error.status || 500 },
    )
  }
}
