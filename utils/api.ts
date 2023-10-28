import { NextApiRequest, NextApiResponse } from "next"
import { getUser } from "./auth"
import { NextResponse } from "next/server"
import { User } from "@/types/types"
import httpStatus from "http-status"

export type ApiRequestContext = {
  user: User | null
}

type ApiRequestHandler<Body = unknown> = (
  req: NextApiRequest,
  res: NextApiResponse,
  context: ApiRequestContext
) => Promise<Body>

export const getErrorResponse = (status: number) =>  NextResponse.json(
  { error: httpStatus[status] },
  { status }
)

/**
 * Confirm that the user is logged in based on a session cookie or API key.
 */
export const apiRequestHandler = <Body = unknown>(
  handler: ApiRequestHandler<Body>
) => async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await getUser()

  return handler(req, res, { user })
}
