import { connect } from "near-api-js"
import { NEAR_API_CONFIG } from "@/utils/near-api/config"

export const getNearApiConnection = async () => connect(NEAR_API_CONFIG)
