import { act, fireEvent, render, screen, waitFor } from "@testing-library/react"
import { setBaseToken } from "@/actions/deployment/set-base-token"
import { deployDefaultTokens } from "@/actions/deployment/deploy-default-tokens"
import { updateSilo } from "@/actions/silos/update-silo"
import { initialiseSiloWhitelists } from "@/actions/deployment/initialise-silo-whitelists"
import { DeploymentProgressContent } from "./DeploymentProgressContent"
import { mockTeam } from "../../../../../../test-utils/mock-team"
import { createWrapper } from "../../../../../../test-utils/create-wrapper"
import { createMockSilo } from "../../../../../../test-utils/factories/silo-factory"
import { createMockOnboardingForm } from "../../../../../../test-utils/factories/onboarding-form-factory"

jest.useFakeTimers()
jest.mock("../../../../../actions/deployment/set-base-token")
jest.mock("../../../../../actions/deployment/deploy-default-tokens")
jest.mock("../../../../../actions/deployment/initialise-silo-whitelists")
jest.mock("../../../../../actions/silos/update-silo")

const getSteps = () => {
  const steps = screen.getAllByTestId("deployment-step")

  return steps.map((step) => {
    return {
      id: step.id,
      isSelected: step.getAttribute("aria-current") === "step",
    }
  })
}

const getCurrentStep = () => {
  const steps = getSteps()

  return steps.find((step) => step.isSelected)?.id
}

describe("DeploymentProgressContent", () => {
  beforeEach(() => {
    ;(setBaseToken as jest.Mock).mockResolvedValue("PENDING")
    ;(deployDefaultTokens as jest.Mock).mockResolvedValue("PENDING")
    ;(initialiseSiloWhitelists as jest.Mock).mockResolvedValue("PENDING")
  })

  afterEach(() => {
    jest.clearAllTimers()
  })

  describe("welcome", () => {
    it("shows the expected steps", async () => {
      render(
        <DeploymentProgressContent
          hasUnassignedSilo
          team={mockTeam}
          silo={null}
          onboardingForm={null}
          setIsDeploymentComplete={() => {}}
        />,
        { wrapper: createWrapper() },
      )

      expect(getSteps()).toEqual([
        {
          id: "CONFIGURE_CHAIN",
          isSelected: true,
        },
        {
          id: "START_DEPLOYMENT",
          isSelected: false,
        },
      ])
    })
  })

  describe("onboarding", () => {
    it("shows the expected steps", async () => {
      render(
        <DeploymentProgressContent
          hasUnassignedSilo
          team={mockTeam}
          silo={null}
          onboardingForm={createMockOnboardingForm()}
          setIsDeploymentComplete={() => {}}
        />,
        { wrapper: createWrapper() },
      )

      expect(getSteps()).toEqual([
        {
          id: "CONFIGURE_CHAIN",
          isSelected: false,
        },
        {
          id: "START_DEPLOYMENT",
          isSelected: true,
        },
      ])
    })
  })

  describe("deployment in progress", () => {
    it("shows the expected steps on mount", async () => {
      render(
        <DeploymentProgressContent
          hasUnassignedSilo
          team={mockTeam}
          silo={createMockSilo()}
          onboardingForm={createMockOnboardingForm()}
          setIsDeploymentComplete={() => {}}
        />,
        { wrapper: createWrapper() },
      )

      expect(getSteps()).toEqual([
        {
          id: "CONFIGURED_CHAIN",
          isSelected: false,
        },
        {
          id: "INIT_AURORA_ENGINE",
          isSelected: true,
        },
        {
          id: "SETTING_BASE_TOKEN",
          isSelected: false,
        },
        {
          id: "DEPLOYING_DEFAULT_TOKENS",
          isSelected: false,
        },
        {
          id: "START_BLOCK_EXPLORER",
          isSelected: false,
        },
        {
          id: "CHAIN_DEPLOYED",
          isSelected: false,
        },
      ])
    })

    it("starts by initialising the silo whitelists", async () => {
      const silo = createMockSilo({
        base_token_symbol: "AURORA",
        base_token_name: "Aurora",
      })

      render(
        <DeploymentProgressContent
          hasUnassignedSilo
          team={mockTeam}
          silo={silo}
          onboardingForm={createMockOnboardingForm()}
          setIsDeploymentComplete={() => {}}
        />,
        { wrapper: createWrapper() },
      )

      await waitFor(() => {
        expect(getCurrentStep()).toBe("INIT_AURORA_ENGINE")
      })

      expect(initialiseSiloWhitelists).toHaveBeenCalledTimes(1)
      expect(initialiseSiloWhitelists).toHaveBeenCalledWith(silo)

      expect(setBaseToken).not.toHaveBeenCalled()
      expect(deployDefaultTokens).not.toHaveBeenCalled()
    })

    it.each`
      makeTxsWhitelistStatus | deployContractWhitelistStatus
      ${"PENDING"}           | ${"PENDING"}
      ${"PENDING"}           | ${"SUCCESSFUL"}
      ${"SUCCESSFUL"}        | ${"PENDING"}
      ${"FAILED"}            | ${"PENDING"}
      ${"SUCCESSFUL"}        | ${"FAILED"}
    `(
      "starts at the initialising silo whitelists step if make tx is $makeTxsWhitelistStatus and deploy contracts is $deployContractWhitelistStatus",
      async ({ makeTxsWhitelistStatus, deployContractWhitelistStatus }) => {
        const silo = createMockSilo({
          base_token_symbol: "AURORA",
          base_token_name: "Aurora",
        })

        render(
          <DeploymentProgressContent
            hasUnassignedSilo
            team={mockTeam}
            silo={silo}
            onboardingForm={createMockOnboardingForm()}
            setIsDeploymentComplete={() => {}}
            siloTransactionStatuses={{
              INITIALISE_MAKE_TXS_WHITELIST: makeTxsWhitelistStatus,
              INITIALISE_DEPLOY_CONTRACT_WHITELIST:
                deployContractWhitelistStatus,
            }}
          />,
          { wrapper: createWrapper() },
        )

        await waitFor(() => {
          expect(getCurrentStep()).toBe("INIT_AURORA_ENGINE")
        })

        expect(initialiseSiloWhitelists).toHaveBeenCalledTimes(1)
        expect(initialiseSiloWhitelists).toHaveBeenCalledWith(silo)
      },
    )

    it("sets the base token once the silo whitelists have been initialised", async () => {
      ;(initialiseSiloWhitelists as jest.Mock).mockResolvedValue("SUCCESSFUL")

      const silo = createMockSilo({
        base_token_symbol: "AURORA",
        base_token_name: "Aurora",
      })

      render(
        <DeploymentProgressContent
          hasUnassignedSilo
          team={mockTeam}
          silo={silo}
          onboardingForm={createMockOnboardingForm()}
          setIsDeploymentComplete={() => {}}
        />,
        { wrapper: createWrapper() },
      )

      await waitFor(() => {
        expect(getCurrentStep()).toBe("INIT_AURORA_ENGINE")
      })

      expect(setBaseToken).toHaveBeenCalledTimes(1)
      expect(setBaseToken).toHaveBeenCalledWith(silo)
    })

    it("skips the initialise step if both transactions were already successful", async () => {
      const silo = createMockSilo({
        base_token_symbol: "AURORA",
        base_token_name: "Aurora",
      })

      render(
        <DeploymentProgressContent
          hasUnassignedSilo
          team={mockTeam}
          silo={silo}
          onboardingForm={createMockOnboardingForm()}
          setIsDeploymentComplete={() => {}}
          siloTransactionStatuses={{
            INITIALISE_MAKE_TXS_WHITELIST: "SUCCESSFUL",
            INITIALISE_DEPLOY_CONTRACT_WHITELIST: "SUCCESSFUL",
          }}
        />,
        { wrapper: createWrapper() },
      )

      await waitFor(() => {
        expect(getCurrentStep()).toBe("SETTING_BASE_TOKEN")
      })

      expect(initialiseSiloWhitelists).not.toHaveBeenCalled()
    })

    it("starts from the deploying tokens step if no previous relevant transactions", async () => {
      ;(initialiseSiloWhitelists as jest.Mock).mockResolvedValue("SUCCESSFUL")
      ;(setBaseToken as jest.Mock).mockResolvedValue("SUCCESSFUL")

      render(
        <DeploymentProgressContent
          hasUnassignedSilo
          team={mockTeam}
          silo={createMockSilo({
            base_token_symbol: "AURORA",
            base_token_name: "Aurora",
          })}
          onboardingForm={createMockOnboardingForm()}
          setIsDeploymentComplete={() => {}}
          siloTransactionStatuses={{
            SET_BASE_TOKEN: "SUCCESSFUL",
          }}
        />,
        { wrapper: createWrapper() },
      )

      await waitFor(() => {
        expect(getCurrentStep()).toBe("DEPLOYING_DEFAULT_TOKENS")
      })
    })

    it.each(["FAILED", "PENDING"] as const)(
      "starts from the deploying tokens step if a previous transaction is in the %p state",
      async (status) => {
        render(
          <DeploymentProgressContent
            hasUnassignedSilo
            team={mockTeam}
            silo={createMockSilo({
              base_token_symbol: "AURORA",
              base_token_name: "Aurora",
            })}
            onboardingForm={createMockOnboardingForm()}
            setIsDeploymentComplete={() => {}}
            siloTransactionStatuses={{
              INITIALISE_MAKE_TXS_WHITELIST: "SUCCESSFUL",
              INITIALISE_DEPLOY_CONTRACT_WHITELIST: "SUCCESSFUL",
              SET_BASE_TOKEN: "SUCCESSFUL",
              DEPLOY_AURORA: status,
            }}
          />,
          { wrapper: createWrapper() },
        )

        await waitFor(() => {
          expect(getCurrentStep()).toBe("DEPLOYING_DEFAULT_TOKENS")
        })
      },
    )

    it("starts the block explorer once all transaction-based steps are complete", async () => {
      render(
        <DeploymentProgressContent
          hasUnassignedSilo
          team={mockTeam}
          silo={createMockSilo({
            base_token_symbol: "AURORA",
            base_token_name: "Aurora",
          })}
          onboardingForm={createMockOnboardingForm()}
          setIsDeploymentComplete={() => {}}
          siloTransactionStatuses={{
            INITIALISE_MAKE_TXS_WHITELIST: "SUCCESSFUL",
            INITIALISE_DEPLOY_CONTRACT_WHITELIST: "SUCCESSFUL",
            SET_BASE_TOKEN: "SUCCESSFUL",
            DEPLOY_AURORA: "SUCCESSFUL",
            DEPLOY_NEAR: "SUCCESSFUL",
            DEPLOY_USDT: "SUCCESSFUL",
            DEPLOY_USDC: "SUCCESSFUL",
          }}
        />,
        { wrapper: createWrapper() },
      )

      await waitFor(() => {
        expect(getCurrentStep()).toBe("START_BLOCK_EXPLORER")
      })
    })

    it("marks the silo as active and the deployment as complete once everything is configured", async () => {
      const setIsDeploymentComplete = jest.fn()
      const silo = createMockSilo({
        is_active: false,
        base_token_symbol: "AURORA",
        base_token_name: "Aurora",
      })

      render(
        <DeploymentProgressContent
          hasUnassignedSilo
          team={mockTeam}
          silo={silo}
          onboardingForm={createMockOnboardingForm()}
          setIsDeploymentComplete={setIsDeploymentComplete}
          siloTransactionStatuses={{
            INITIALISE_MAKE_TXS_WHITELIST: "SUCCESSFUL",
            INITIALISE_DEPLOY_CONTRACT_WHITELIST: "SUCCESSFUL",
            SET_BASE_TOKEN: "SUCCESSFUL",
            DEPLOY_AURORA: "SUCCESSFUL",
            DEPLOY_NEAR: "SUCCESSFUL",
            DEPLOY_USDT: "SUCCESSFUL",
            DEPLOY_USDC: "SUCCESSFUL",
          }}
        />,
        { wrapper: createWrapper() },
      )

      await waitFor(() => {
        expect(getCurrentStep()).toBe("START_BLOCK_EXPLORER")
      })

      act(() => {
        jest.advanceTimersByTime(2500)
      })

      fireEvent.click(await screen.findByText(/Finish deployment/i))

      expect(setIsDeploymentComplete).toHaveBeenCalledTimes(1)
      expect(setIsDeploymentComplete).toHaveBeenCalledWith(true)

      expect(updateSilo).toHaveBeenCalledWith(silo.id, {
        is_active: true,
      })
    })

    it("retrys when the try again button is clicked when setting the base token fails", async () => {
      ;(initialiseSiloWhitelists as jest.Mock).mockResolvedValue("SUCCESSFUL")
      ;(setBaseToken as jest.Mock).mockResolvedValue("FAILED")

      render(
        <DeploymentProgressContent
          hasUnassignedSilo
          team={mockTeam}
          silo={createMockSilo({
            base_token_symbol: "AURORA",
            base_token_name: "Aurora",
          })}
          onboardingForm={createMockOnboardingForm()}
          setIsDeploymentComplete={() => {}}
        />,
        { wrapper: createWrapper() },
      )

      act(() => {
        jest.advanceTimersByTime(2500)
      })

      await waitFor(() => {
        expect(getCurrentStep()).toBe("SETTING_BASE_TOKEN")
      })

      expect(setBaseToken).toHaveBeenCalledTimes(1)

      fireEvent.click(await screen.findByRole("button", { name: "Try again" }))

      await waitFor(() => {
        expect(setBaseToken).toHaveBeenCalledTimes(2)
      })
    })
  })

  describe("manual deployment", () => {
    it("shows the expected content when the base token cannot be automated", async () => {
      render(
        <DeploymentProgressContent
          hasUnassignedSilo
          team={mockTeam}
          silo={null}
          onboardingForm={createMockOnboardingForm({ baseToken: "BTC" })}
          setIsDeploymentComplete={() => {}}
        />,
        { wrapper: createWrapper() },
      )

      expect(getSteps()).toEqual([
        {
          id: "CONFIGURE_CHAIN",
          isSelected: false,
        },
        {
          id: "MANUAL_DEPLOYMENT",
          isSelected: true,
        },
      ])
    })

    it("shows the expected content when the base token can be automated but there are no more silos", async () => {
      render(
        <DeploymentProgressContent
          hasUnassignedSilo={false}
          team={mockTeam}
          silo={null}
          onboardingForm={createMockOnboardingForm({ baseToken: "AURORA" })}
          setIsDeploymentComplete={() => {}}
        />,
        { wrapper: createWrapper() },
      )

      expect(getSteps()).toEqual([
        {
          id: "CONFIGURE_CHAIN",
          isSelected: false,
        },
        {
          id: "MANUAL_DEPLOYMENT",
          isSelected: true,
        },
      ])
    })
  })
})
