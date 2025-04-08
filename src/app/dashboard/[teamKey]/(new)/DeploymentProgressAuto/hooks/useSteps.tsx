import { useRouter } from "next/navigation"
import { ArrowRightIcon } from "@heroicons/react/24/solid"

import type { Team } from "@/types/types"

import type { Step, StepsAttrs } from "../types"

type Args = {
  team: Team
  onClick?: (step: Step) => Promise<void> | void
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
            onClick?.({ name: "START_DEPLOYMENT", state: "current" }),
        },
      },
    },

    INIT_AURORA_ENGINE: {
      title: "Initializing the Aurora engine",
      delayed: {
        description: "Running a bit slow — come back shortly.",
      },
      failed: {
        description:
          "Please try again or contact us to resolve the server issue promptly.",
        action: {
          variant: "destructive",
          title: "Try again",
          onClick: () =>
            onClick?.({ name: "INIT_AURORA_ENGINE", state: "failed" }),
        },
      },
    },

    SETTING_BASE_TOKEN: {
      title: "Setting up the base token",
      delayed: {
        description: "Running a bit slow — come back shortly.",
      },
      failed: {
        description:
          "Please try again or contact us to resolve the server issue promptly.",
        action: {
          variant: "destructive",
          title: "Try again",
          onClick: () =>
            onClick?.({ name: "SETTING_BASE_TOKEN", state: "failed" }),
        },
      },
    },

    DEPLOYING_DEFAULT_TOKENS: {
      title: "Deploying default tokens",
      delayed: {
        description: "Running a bit slow — come back shortly.",
      },
      failed: {
        description:
          "Please try again or contact us to resolve the server issue promptly.",
        action: {
          variant: "destructive",
          title: "Try again",
          onClick: () =>
            onClick?.({ name: "DEPLOYING_DEFAULT_TOKENS", state: "failed" }),
        },
      },
    },

    CONFIGURING_CONSOLE: {
      title: "Configuring your console",
    },

    CHAIN_DEPLOYED: {
      title: "Chain successfully deployed",
      completed: {
        action: {
          variant: "primary",
          title: "Finish deployment",
          icon: <ArrowRightIcon className="w-4 h-4" />,
          onClick: () =>
            onClick?.({ name: "CHAIN_DEPLOYED", state: "completed" }),
        },
      },
    },

    MANUAL_DEPLOYMENT: {
      title: "Contact us on Telegram to start deployment",
      current: {
        description: "We’d like to review your unique setup before proceeding.",
        action: {
          variant: "primary",
          title: "Contact us",
          onClick: () => {
            window.open("https://t.me/Aurora_TG_Manager", "_blank")
          },
        },
      },
    },
  } as const
}
