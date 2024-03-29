import { createContract } from "@/app/api/contract"
import { ApiUser, Team } from "@/types/types"
import { ServerInferRequest, ServerInferResponseBody } from "@ts-rest/core"
import { NextRequest, NextResponse } from "next/server"

export type BaseApiRequestContext = {
  params: {
    [key: string]: string
  }
}

export type ApiRequestContext<TRequestBody> = BaseApiRequestContext & {
  body: TRequestBody
  user: ApiUser
  team: Team
}

export type ApiRequestHandler<TResponseBody, TRequestBody> = (
  req: NextRequest,
  context: ApiRequestContext<TRequestBody>,
) => Promise<TResponseBody>

type ApiContract = ReturnType<typeof createContract>

export type ApiOperation = keyof ApiContract

export type ApiResponseBody<T extends ApiOperation> = ServerInferResponseBody<
  ApiContract[T]
>

export type ApiRequestBody<T extends ApiOperation> = ServerInferRequest<
  ApiContract[T]
> extends {
  body: infer Body
}
  ? Body
  : never

export type ApiRequestParams<T extends ApiOperation> = ServerInferRequest<
  ApiContract[T]
> extends {
  params: infer Params
}
  ? Params
  : never

export type ApiRequestQuery<T extends ApiOperation> = ServerInferRequest<
  ApiContract[T]
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

export type ApiResponse<TResponseBody> =
  | NextResponse<TResponseBody | ApiErrorResponse>
  | Response

export type ApiEndpointCacheOptions = {
  maxAge: string
  staleWhileRevalidate?: string
}

export type ApiEndpointOptions = {
  cache?: ApiEndpointCacheOptions
}
