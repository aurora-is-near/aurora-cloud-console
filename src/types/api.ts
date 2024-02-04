import { contract } from "@/app/api/contract"
import { ApiUser, Team } from "@/types/types"
import { ServerInferRequest, ServerInferResponseBody } from "@ts-rest/core"
import { NextRequest, NextResponse } from "next/server"

export type BaseApiRequestContext = {
  params: {
    [key: string]: string
  }
}

export type ApiRequestContext = BaseApiRequestContext & {
  user: ApiUser
  team: Team
}

export type ApiRequestHandler<Body = unknown> = (
  req: NextRequest,
  context: ApiRequestContext,
) => Promise<Body>

export type ApiOperation = keyof typeof contract

export type ApiResponseBody<T extends ApiOperation> = ServerInferResponseBody<
  (typeof contract)[T]
>

export type ApiRequestBody<T extends ApiOperation> = ServerInferRequest<
  (typeof contract)[T]
> extends {
  body: infer Body
}
  ? Body
  : never

export type ApiRequestParams<T extends ApiOperation> = ServerInferRequest<
  (typeof contract)[T]
> extends {
  params: infer Params
}
  ? Params
  : never

export type ApiRequestQuery<T extends ApiOperation> = ServerInferRequest<
  (typeof contract)[T]
> extends {
  query: infer Query
}
  ? Query
  : never

export type ApiErrorResponse = {
  type: string
  statusCode: number
  message: string
  details?: string
}

export type ApiResponse<Body = unknown> =
  | NextResponse<Body | ApiErrorResponse>
  | Response
