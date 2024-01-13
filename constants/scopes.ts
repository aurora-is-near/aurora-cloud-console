import { ApiKeyScope } from "@prisma/client"

// A map to define all scopes defined by the types.
const API_KEY_SCOPES_MAP: Record<ApiKeyScope, boolean> = {
  DEALS_READ: true,
  DEALS_WRITE: true,
  SILOS_READ: true,
  USERS_READ: true,
  USERS_WRITE: true,
  TRANSACTIONS_READ: true,
}

export const API_KEY_SCOPES = Object.keys(API_KEY_SCOPES_MAP) as ApiKeyScope[]
