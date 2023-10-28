import { NextResponse } from "next/server"
import { getUserLists } from "@/mockApi"
import { apiRequestHandler } from "@/utils/api"

export const GET = apiRequestHandler(async () => {
  // TODO: Query the actual user's company's userlists
  const lists = await getUserLists()

  return NextResponse.json(lists)
})
