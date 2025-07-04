import { getTeamOnboardingForm } from "@/actions/onboarding/get-onboarding-form"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { BASE_TOKENS } from "@/constants/base-token"
import { assignSiloToTeam } from "@/actions/deployment/assign-silo-to-team"
import {
  createInsertOrUpdate,
  createSelect,
  mockSupabaseClient,
} from "../../../test-utils/mock-supabase-client"
import { createMockSilo } from "../../../test-utils/factories/silo-factory"
import { createMockOnboardingForm } from "../../../test-utils/factories/onboarding-form-factory"

describe("assignSiloToTeam", () => {
  it("assigns an unassigned silo to a team", async () => {
    const teamId = 123
    const mockSilo = createMockSilo()
    const mockOnboardingForm = createMockOnboardingForm({
      baseToken: "AURORA",
      chainName: "Test Chain",
    })

    const siloSelectQueries = createSelect(mockSilo)
    const siloUpdateQueries = createInsertOrUpdate(mockSilo)
    const onboardingFormSelectQueries = createSelect(mockOnboardingForm)

    mockSupabaseClient.from("silos").select.mockReturnValue(siloSelectQueries)
    mockSupabaseClient.from("silos").update.mockReturnValue(siloUpdateQueries)
    mockSupabaseClient
      .from("onboarding_form")
      .select.mockReturnValue(onboardingFormSelectQueries)

    const result = await assignSiloToTeam(teamId)

    expect(result).toEqual(mockSilo)

    expect(siloUpdateQueries.eq).toHaveBeenCalledTimes(1)
    expect(siloUpdateQueries.eq).toHaveBeenCalledWith("id", mockSilo.id)

    expect(mockSupabaseClient.from("silos").update).toHaveBeenCalledTimes(1)
    expect(mockSupabaseClient.from("silos").update).toHaveBeenCalledWith({
      name: "Test Chain",
      base_token_name: "Aurora",
      base_token_symbol: "AURORA",
      is_deploy_contracts_public: true,
      is_make_txs_public: true,
      base_token_decimals: 18,
    })

    expect(onboardingFormSelectQueries.eq).toHaveBeenCalledTimes(1)
    expect(onboardingFormSelectQueries.eq).toHaveBeenCalledWith("team_id", 123)

    expect(mockSupabaseClient.from("silos_teams").insert).toHaveBeenCalledTimes(
      1,
    )

    expect(mockSupabaseClient.from("silos_teams").insert).toHaveBeenCalledWith([
      {
        silo_id: mockSilo.id,
        team_id: teamId,
      },
    ])
  })

  it("does not set the base token details in the assigned silo for a custom token", async () => {
    const mockSilo = createMockSilo()
    const mockOnboardingForm = createMockOnboardingForm({
      baseToken: "CUSTOM",
      chainName: "Test Chain",
    })

    mockSupabaseClient
      .from("silos")
      .select.mockReturnValue(createSelect(mockSilo))

    mockSupabaseClient
      .from("silos")
      .update.mockReturnValue(createInsertOrUpdate(mockSilo))

    mockSupabaseClient
      .from("onboarding_form")
      .select.mockReturnValue(createSelect(mockOnboardingForm))

    const result = await assignSiloToTeam(123)

    expect(result).toEqual(mockSilo)

    expect(mockSupabaseClient.from("silos").update).toHaveBeenCalledTimes(1)
    expect(mockSupabaseClient.from("silos").update).toHaveBeenCalledWith({
      name: "Test Chain",
      is_deploy_contracts_public: true,
      is_make_txs_public: true,
    })
  })

  it("returns null if there are no unassigned silos", async () => {
    mockSupabaseClient.from("silos").select.mockReturnValue(createSelect())

    const result = await assignSiloToTeam(123)

    expect(result).toBeNull()
  })

  it.each`
    onboardingFormValue      | isMakeTxsPublic | isDeployContractsPublic
    ${"public"}              | ${true}         | ${true}
    ${"public_permissioned"} | ${true}         | ${false}
    ${"private"}             | ${false}        | ${false}
  `(
    "sets the expected permissions based on the the form data being set to $onboardingFormStatus",
    async ({
      onboardingFormValue,
      isMakeTxsPublic,
      isDeployContractsPublic,
    }) => {
      const teamId = 123
      const mockSilo = createMockSilo()

      mockSupabaseClient
        .from("silos")
        .select.mockReturnValue(createSelect(mockSilo))
      mockSupabaseClient
        .from("silos")
        .update.mockReturnValue(createInsertOrUpdate(mockSilo))
      mockSupabaseClient.from("onboarding_form").select.mockReturnValue(
        createSelect(
          createMockOnboardingForm({
            baseToken: "AURORA",
            chainName: "Test Chain",
            chainPermission: onboardingFormValue,
          }),
        ),
      )

      const result = await assignSiloToTeam(teamId)

      expect(result).toEqual(mockSilo)

      expect(mockSupabaseClient.from("silos").update).toHaveBeenCalledTimes(1)
      expect(mockSupabaseClient.from("silos").update).toHaveBeenCalledWith({
        name: "Test Chain",
        base_token_name: "Aurora",
        base_token_symbol: "AURORA",
        is_deploy_contracts_public: isDeployContractsPublic,
        is_make_txs_public: isMakeTxsPublic,
        base_token_decimals: 18,
      })
    },
  )
})
