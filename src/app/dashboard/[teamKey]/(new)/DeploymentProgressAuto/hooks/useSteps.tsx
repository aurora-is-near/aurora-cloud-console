import { useRouter } from "next/navigation"
import { ArrowRightIcon } from "@heroicons/react/24/solid"

import type { Team } from "@/types/types"

import type { StepsAttrs } from "../types"

type Args = {
  team: Team
  onClick: (step: { name: "START_DEPLOYMENT"; state: "current" }) => void
}

export const useSteps = ({ team, onClick }: Args): StepsAttrs => {
  const router = useRouter()

  return {
    CONFIGURED_CHAIN: {
      title: "Configure your virtual chain",
    },

    CONFIGURE_CHAIN: {
      title: "Configure your virtual chain",
      current: {
        action: {
          variant: "primary",
          title: "Get started",
          onClick: () =>
            router.push(`/dashboard/${team.team_key}/create-chain`),
        },
      },
      completed: {
        action: {
          variant: "border",
          title: "Edit",
          onClick: () =>
            router.push(`/dashboard/${team.team_key}/create-chain`),
        },
      },
    },

    START_DEPLOYMENT: {
      title: "Start automatic deployment",
      upcoming: {
        action: {
          disabled: true,
          variant: "secondary",
          title: "Deploy now",
        },
      },
      current: {
        action: {
          variant: "primary",
          title: "Deploy now",
          onClick: () =>
            onClick({ name: "START_DEPLOYMENT", state: "current" }),
        },
      },
    },

    INIT_AURORA_ENGINE: {
      title: "Initializing the Aurora engine",
    },

    SETTING_BASE_TOKEN: {
      title: "Setting up the base token",
      failed: {
        description:
          "Please try again or contact us to resolve the server issue promptly.",
        action: {
          variant: "destructive",
          title: "Try again",
          onClick: () => null,
        },
      },
    },

    SETTING_BASE_TOKEN_RETRY: {
      title: "Setting up the base token",
      pending: {
        description: "Running a bit slow — come back shortly.",
      },
    },

    START_BLOCK_EXPLORER: {
      title: "Starting your Block Explorer",
    },

    CHAIN_DEPLOYED: {
      title: "Chain successfully deployed",
      completed: {
        action: {
          variant: "primary",
          title: "Finish deployment",
          icon: <ArrowRightIcon className="w-4 h-4" />,
          // TODO: Set Silo ID
          onClick: () =>
            router.push(`/dashboard/${team.team_key}/silos/1/gas-abstraction`),
        },
      },
    },
  } as const
}
