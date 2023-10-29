import { NextRequest, NextResponse } from "next/server"
import serverSupabase from "@/utils/serverSupabase"
import confirmUser from "@/utils/confirmUser"

export async function PATCH(request: NextRequest) {
  const id = await confirmUser()
  const supabase = serverSupabase()

  const { newName } = await request.json()

  const { error } = await supabase
    .from("users")
    .update({ name: newName })
    .eq("id", id)

  if (error) throw error

  try {
    return NextResponse.json({ status: "OK" })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Something went wrong." },
      { status: error.status || 500 },
    )
  }
}
