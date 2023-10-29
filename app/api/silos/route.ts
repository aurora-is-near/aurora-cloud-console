import { NextRequest, NextResponse } from "next/server"
import confirmUser from "@/utils/confirmUser"
import { getSilos } from "@/mockApi"

export async function GET(request: NextRequest) {
  const id = await confirmUser()

  // TODO: Query the actual user's company's silos

  const silos = await getSilos()

  try {
    return NextResponse.json(silos)
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Something went wrong." },
      { status: error.status || 500 },
    )
  }
}
