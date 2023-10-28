import { NextResponse } from "next/server"
import { adminSupabase } from "@/utils/supabase"
import { NextApiRequest, NextApiResponse } from "next"
import { ApiRequestContext, apiRequestHandler } from "@/utils/api"
import { abortIfUnauthorised } from "@/utils/abort"

export const PATCH = apiRequestHandler(async (
  req: NextApiRequest,
  _res: NextApiResponse,
  ctx: ApiRequestContext
) => {
  const supabase = adminSupabase()
  const { newName } = await req.body

  abortIfUnauthorised(ctx)

  const { error } = await supabase
    .from("users")
    .update({ name: newName })
    .eq("user_guid", ctx.user.user_guid)

  if (error) throw error

  return NextResponse.json({ status: "OK" })
})
