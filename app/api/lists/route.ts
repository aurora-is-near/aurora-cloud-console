import { NextRequest, NextResponse } from "next/server"
import confirmUser from "@/utils/confirmUser"
import { getUserLists } from "@/mockApi"

export async function GET(request: NextRequest) {
  const id = await confirmUser()

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
}
