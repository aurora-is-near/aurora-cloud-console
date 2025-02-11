import { ChainCreationForm } from "@/hooks/useChainCreationForm"
import { Team } from "@/types/types"
import { sendSlackMessage } from "@/utils/send-slack-notification"

export const sendSlackOnboardingNotification = async (
  team: Team,
  onboardingForm: ChainCreationForm,
) => {
  const summary = `New onboarding completed with Telegram handle added for team "${
    team?.name ?? "Unknown"
  }" (ACC ID: ${team.id})`

  await sendSlackMessage(
    {
      text: summary,
      blocks: [
        {
          type: "header",
          text: {
            type: "plain_text",
            text: summary,
          },
        },
        {
          type: "divider",
        },
        {
          type: "section",
          text: {
            text: `*Chain Name*\n${onboardingForm.chainName}`,
            type: "mrkdwn",
          },
        },
        {
          type: "section",
          text: {
            text: `*Telegram Handle*\n${onboardingForm.telegramHandle}`,
            type: "mrkdwn",
          },
        },
        {
          type: "section",
          text: {
            text: `*Comments*\n${onboardingForm.comments}`,
            type: "mrkdwn",
          },
        },
      ],
    },
    "https://hooks.slack.com/services/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",
  )
}
