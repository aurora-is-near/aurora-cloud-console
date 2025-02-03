import { PublicApiScope } from "@/types/types"

// A map to define all scopes defined by the types.
const API_KEY_SCOPES_MAP: Record<PublicApiScope, boolean> = {
  "deals:read": true,
  "deals:write": true,
  "silos:read": true,
  "users:read": true,
  "users:write": true,
  "transactions:read": true,
  "lists:read": true,
  "lists:write": true,
  "forwarder:read": true,
  "forwarder:write": true,
  "assets:write": true,
  "payments:read": true,
  "payments:write": true,
}

export const API_KEY_SCOPES = Object.keys(
  API_KEY_SCOPES_MAP,
) as PublicApiScope[]
