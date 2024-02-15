import { apiRequestHandler } from "@/utils/api"

export const GET = apiRequestHandler(["admin"], async (_req, ctx) => ctx.user)
