import { NextRequest, NextResponse } from "next/server"
import { ApiRequestContext, apiRequestHandler } from "@/utils/api"
import { adminSupabase } from "@/utils/supabase"
import { Teams } from "@/types/types"

export const GET = apiRequestHandler(
  ["admin"],
  async (_req: NextRequest, ctx: ApiRequestContext) => {
    const supabase = adminSupabase()
    const { data, error } = await supabase
      .from("teams")
      .select("id, name, team_key")

    if (error) {
      throw error
    }

    return NextResponse.json<Teams>({
      teams: data.map((team) => ({
        id: team.id,
        name: team.name,
        key: team.team_key,
      })),
    })
  },
)
