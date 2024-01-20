import { contract } from "@/api-contract"
import { ServerInferResponseBody, ServerInferResponses } from "@ts-rest/core"
import { NextResponse } from "next/server"

export type ApiOperation = keyof typeof contract

export type ApiResponseBody<T extends ApiOperation> = ServerInferResponseBody<
  (typeof contract)[T]
>

export type ApiResponse<T extends ApiOperation> = NextResponse<
  ApiResponseBody<T>
>
