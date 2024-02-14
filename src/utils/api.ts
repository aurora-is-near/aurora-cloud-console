import { getUser } from "./auth"
import { NextRequest, NextResponse } from "next/server"
import { ApiScope } from "@/types/types"
import httpStatus from "http-status"
import { toError } from "./errors"
import { abort, abortIfUnauthorised, isAbortError } from "./abort"
import { kebabCase } from "change-case"
import { getCurrentTeam } from "@/utils/current-team"
import {
  ApiErrorResponse,
  ApiOperation,
  ApiRequestHandler,
  ApiResponse,
  ApiResponseBody,
  BaseApiRequestContext,
} from "@/types/api"
import { contract } from "@/app/api/contract"
import { openApiDocument } from "@/app/api/openapi-document"
import OpenAPIRequestValidator from "openapi-request-validator"
import { OpenAPIV3 } from "openapi-types"

/**
 * Get the specific type of error.
 *
 * If one was provided when aborting further up the chain use that, otherwise
 * fallback to a default based on the status code.
 * @example /probs/token-expired
 * @example /probs/bad-request
 */
const getErrorType = (error: unknown, statusCode: number): string => {
  return isAbortError(error) && error.type
    ? error.type
    : `/probs/${kebabCase(String(httpStatus[statusCode]))}`
}

/**
 * Get an error response in the format of a RFC7807 problem details object.
 *
 * @see https://datatracker.ietf.org/doc/html/rfc7807
 */
const getErrorResponse = (error: unknown): NextResponse<ApiErrorResponse> => {
  const statusCode = isAbortError(error) ? error.statusCode : 500

  const response = NextResponse.json(
    {
      type: getErrorType(error, statusCode),
      statusCode,
      message: toError(error).message,
      details: isAbortError(error) ? error.detail : undefined,
    },
    { status: statusCode },
  )

  response.headers.set("Content-Type", "application/problem+json")

  return response
}

const handleRequest = async <Body = unknown>(
  req: NextRequest,
  ctx: BaseApiRequestContext,
  scopes: ApiScope[],
  handler: ApiRequestHandler<Body>,
): Promise<ApiResponse<Body>> => {
  const [user, team] = await Promise.all([
    getUser(),
    getCurrentTeam(req.headers),
  ])
  let data: Body

  try {
    abortIfUnauthorised(user, scopes, team.team_key)
    data = await handler(req, { ...ctx, user, team })
  } catch (error: unknown) {
    console.error(error)

    return getErrorResponse(error)
  }

  if (!data) {
    return new Response(null, { status: 204 })
  }

  return NextResponse.json(data)
}

export const apiRequestHandler =
  <Body = unknown>(scopes: ApiScope[], handler: ApiRequestHandler<Body>) =>
  async (req: NextRequest, ctx: BaseApiRequestContext) =>
    handleRequest(req, ctx, scopes, handler)

const getOperations = () => {
  const operations: OpenAPIV3.OperationObject[] = []

  Object.values(openApiDocument.paths).forEach(
    (path: OpenAPIV3.PathItemObject) => {
      operations.push(
        ...[path.get, path.put, path.post, path.delete].filter(
          (item): item is OpenAPIV3.OperationObject => !!item,
        ),
      )
    },
  )

  return operations
}

const getOperation = <T extends ApiOperation>(operationId: T) => {
  const operations = getOperations()

  return operations.find((operation) => operation.operationId === operationId)
}

const isParameterObject = (
  param: OpenAPIV3.ParameterObject | OpenAPIV3.ReferenceObject,
): param is OpenAPIV3.ParameterObject => "name" in param

const isRequestBodyObject = (
  body?: OpenAPIV3.RequestBodyObject | OpenAPIV3.ReferenceObject,
): body is OpenAPIV3.RequestBodyObject => !!body && "content" in body

const getSearchParamsObject = (req: NextRequest) => {
  const obj: Record<string, unknown> = {}

  for (const [key, value] of req.nextUrl.searchParams) {
    obj[key] = value
  }

  return obj
}

/**
 * Validate the request against the OpenAPI contract.
 */
const validateRequest = async <T extends ApiOperation>(
  operationId: T,
  req: NextRequest,
  ctx: BaseApiRequestContext,
) => {
  const operation = getOperation(operationId)

  if (!operation) {
    throw new Error(`Operation "${operationId}" not found`)
  }

  const requestValidator = new OpenAPIRequestValidator({
    requestBody: isRequestBodyObject(operation.requestBody)
      ? operation.requestBody
      : undefined,
    parameters:
      operation.parameters
        ?.filter(isParameterObject)
        .filter((param) => param.in === "query") ?? [],
  })

  const error = requestValidator.validateRequest({
    headers: req.headers,
    body: operation.requestBody,
    query: getSearchParamsObject(req),
  })

  // Will abort with "limit must be a number", for example
  if (error) {
    abort(error.status, `${error.errors[0].path} ${error.errors[0].message}`)
  }
}

/**
 * Create an authenticated API endpoint based on an operation from the contract.
 */
export const createApiEndpoint =
  <T extends ApiOperation>(
    operationId: T,
    handler: ApiRequestHandler<ApiResponseBody<T>>,
  ) =>
  async (
    req: NextRequest,
    ctx: BaseApiRequestContext,
  ): Promise<ApiResponse<ApiResponseBody<T>>> => {
    const { metadata } =
      Object.entries(contract).find(([key]) => key === operationId)?.[1] ?? {}

    try {
      await validateRequest(operationId, req, ctx)
    } catch (error) {
      return getErrorResponse(error)
    }

    const scopes = (metadata?.scopes ?? []) as ApiScope[]
    const data = await handleRequest<ApiResponseBody<T>>(
      req,
      ctx,
      scopes,
      handler,
    )

    return data
  }
