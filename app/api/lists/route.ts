import { NextResponse } from "next/server"
import { getUserLists } from "@/mockApi"
import { apiRequestHandler } from "@/utils/api"

export const GET = apiRequestHandler(async () => {
  // TODO: Query the actual user's company's userlists
  const lists = await getUserLists()

  try {
    return NextResponse.json(lists)
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Something went wrong." },
      { status: error.status || 500 }
    )
  }
})
