import { NextRequest, NextResponse } from "next/server"
import httpStatus from "http-status"
import timestring from "timestring"
import { paramCase } from "change-case"
import OpenAPIRequestValidator from "openapi-request-validator"
import { OpenAPIV3 } from "openapi-types"
import {
  ApiEndpointCacheOptions,
  ApiEndpointOptions,
  ApiErrorResponse,
  ApiOperation,
  ApiRequestBody,
  ApiRequestHandler,
  ApiResponse,
  ApiResponseBody,
  BaseApiRequestContext,
  PrivateApiRequestHandler,
} from "@/types/api"
import { contract } from "@/app/api/contract"
import { openApiDocument } from "@/app/api/openapi-document"
import { ApiScope } from "@/types/types"
import { logger } from "@/logger"
import { abort, isAbortError } from "./abort"
import { toError } from "./errors"
import { authorise } from "./auth"

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
    : `/probs/${paramCase(String(httpStatus[statusCode]))}`
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

const getRequestBody = async (req: NextRequest) => {
  if (req.headers.get("content-type")?.startsWith("multipart/form-data")) {
    return req.formData()
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await req.json()
  } catch {
    return {}
  }
}

const getCacheControlHeader = ({
  maxAge,
  staleWhileRevalidate,
}: ApiEndpointCacheOptions) => {
  let value = `s-maxage=${timestring(maxAge)}`

  if (staleWhileRevalidate) {
    value += `, stale-while-revalidate=${timestring(staleWhileRevalidate)}`
  }

  return value
}

const getResponse = (data: unknown, options?: ApiEndpointOptions) => {
  if (!data) {
    return new Response(null, { status: 204 })
  }

  const responseInit: ResponseInit = {}

  if (options?.cache) {
    responseInit.headers = {
      "Vercel-CDN-Cache-Control": getCacheControlHeader(options.cache),
    }
  }

  return NextResponse.json(data, responseInit)
}

const handleRequest = async <TResponseBody, TRequestBody>({
  req,
  ctx,
  scopes,
  handler,
  body,
  options,
}: {
  req: NextRequest
  ctx: BaseApiRequestContext
  scopes: ApiScope[]
  handler: ApiRequestHandler<TResponseBody, TRequestBody>
  body: TRequestBody
  options?: ApiEndpointOptions
}): Promise<ApiResponse<TResponseBody>> => {
  let data: TResponseBody
  let team

  try {
    team = await authorise(scopes)
    data = await handler(req, { ...ctx, team, body })
  } catch (error: unknown) {
    logger.error(error)

    return getErrorResponse(error)
  }

  return getResponse(data, options)
}

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

const isSchemaObject = (
  schema: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject,
): schema is OpenAPIV3.SchemaObject => "type" in schema

const getParameterType = (parameter?: OpenAPIV3.ParameterObject) => {
  const { schema } = parameter ?? {}

  if (!schema || !isSchemaObject(schema)) {
    return "string"
  }

  return schema.type
}

const getSearchParamsObject = (
  req: NextRequest,
  parameters: OpenAPIV3.ParameterObject[],
) => {
  const obj: Record<string, unknown> = {}

  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of req.nextUrl.searchParams) {
    const parameter = parameters.find((param) => param.name === key)
    const parameterType = getParameterType(parameter)

    if (parameterType === "number" && Number.isFinite(Number(value))) {
      obj[key] = Number(value)

      return
    }

    if (parameterType === "boolean" && ["true", "false"].includes(value)) {
      obj[key] = value === "true"
    }

    obj[key] = value
  }

  return obj
}

const getHeadersObject = (req: NextRequest) => {
  const obj: Record<string, string> = {}

  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of req.headers) {
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
  body: unknown,
) => {
  const operation = getOperation(operationId)

  if (!operation) {
    throw new Error(`Operation "${String(operationId)}" not found`)
  }

  const requestBody = isRequestBodyObject(operation.requestBody)
    ? operation.requestBody
    : undefined

  const parameters =
    operation.parameters
      ?.filter(isParameterObject)
      .filter((param) => param.in === "query") ?? []

  const requestValidator = new OpenAPIRequestValidator({
    requestBody,
    parameters,
  })

  const result = requestValidator.validateRequest({
    headers: getHeadersObject(req),
    body,
    query: getSearchParamsObject(req, parameters),
  })

  // Will abort with, for example, "limit must be a number" or
  // "body must have required property 'name'"
  if (result) {
    const [error] = result.errors

    abort(
      result.status,
      `${error.location === "body" ? `body: ${error.path}` : error.path} ${
        error.message
      }`,
    )
  }
}

/**
 * Create an authenticated API endpoint based on an operation from the contract.
 */
export const createApiEndpoint =
  <T extends ApiOperation>(
    operationId: T,
    handler: ApiRequestHandler<ApiResponseBody<T>, ApiRequestBody<T>>,
    options?: ApiEndpointOptions,
  ) =>
  async (
    req: NextRequest,
    ctx: BaseApiRequestContext,
  ): Promise<ApiResponse<ApiResponseBody<T>>> => {
    const body = await getRequestBody(req)
    const { metadata } =
      Object.entries(contract).find(([key]) => key === operationId)?.[1] ?? {}

    try {
      await validateRequest(operationId, req, body)
    } catch (error) {
      return getErrorResponse(error)
    }

    const scopes = (metadata?.scopes ?? []) as ApiScope[]
    const data = await handleRequest<ApiResponseBody<T>, ApiRequestBody<T>>({
      req,
      ctx,
      scopes,
      handler,
      body,
      options,
    })

    return data
  }

/**
 * Create an internal API endpoint.
 *
 * This is used when we do not want to document the endpoint for public
 * consumption.
 */
export const createPrivateApiEndpoint =
  <TResponseBody>(
    handler: PrivateApiRequestHandler<TResponseBody>,
    options?: ApiEndpointOptions,
  ) =>
  async (
    req: NextRequest,
    ctx: BaseApiRequestContext,
  ): Promise<ApiResponse<TResponseBody>> => {
    let data: TResponseBody

    try {
      data = await handler(req, ctx)
    } catch (error: unknown) {
      logger.error(error)

      return getErrorResponse(error)
    }

    return getResponse(data, options)
  }
