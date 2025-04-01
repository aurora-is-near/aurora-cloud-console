import type { OnboardingForm } from "@/types/types"

export const createMockOnboardingForm = (
  data?: Partial<OnboardingForm>,
): OnboardingForm => ({
  id: 1,
  chainName: "Test Chain",
  chainPermission: "public",
  baseToken: "AURORA",
  comments: "My comments",
  created_at: "2021-01-01T00:00:00Z",
  customTokenDetails: null,
  gasMechanics: "usage",
  integrations: [],
  networkType: "mainnet",
  team_id: 1,
  telegramHandle: "@me",
  phoneNumber: "+4917612345678",
  ...data,
})
