import { ApiUser } from "@/types/types"
import { mockTeam } from "./mock-team"

export const mockUser: ApiUser = {
  created_at: "2023-01-10T00:00:00.000Z",
  email: "me@example.com",
  id: 1,
  name: "John Doe",
  user_id: "1",
  scopes: ["admin"],
  teams: [mockTeam.team_key],
}
