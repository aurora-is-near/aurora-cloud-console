import { Deal } from "@/types/types"

const getIsoString = (date: number | null) => {
  return date ? new Date(date).toISOString() : null
}

export const parseDeal = (deal: Deal) => {
  return {
    id: deal.id,
    created_at: deal.created_at,
    updated_at: deal.updated_at,
    name: deal.name,
    team_id: deal.team_id,
    enabled: deal.enabled,
    start_time: getIsoString(deal.start_time),
    end_time: getIsoString(deal.end_time),
  }
}
