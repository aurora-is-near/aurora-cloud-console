import { Silo, Team } from "@/types/types"
import { sendSlackMessage } from "@/utils/send-slack-notification"
import { sentenceCase } from "change-case"

type IntegrationRequest = "oracle" | "intents" | "trisolaris"

export const notifyIntegrationRequest = async (
  team: Team,
  silo: Silo,
  integrationRequest: IntegrationRequest,
) => {
  const summary = `New integration request for team "${
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
            text: `*Chain Name*\n${silo.name}`,
            type: "mrkdwn",
          },
        },
        {
          type: "section",
          text: {
            text: `*Integration Request*\n${sentenceCase(integrationRequest)}`,
            type: "mrkdwn",
          },
        },
      ],
    },
    "https://hooks.slack.com/services/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",
  )
}
