"use server"

import { sentenceCase } from "change-case"
import { AnyBlock } from "@slack/types"
import { Silo, Team } from "@/types/types"
import { sendSlackMessage } from "@/utils/send-slack-notification"

export const notifyIntegrationRequest = async ({
  subject,
  team,
  silo,
  integrationType,
  extraDetails,
}: {
  subject?: string
  team?: Team
  silo?: Silo
  integrationType: string
  extraDetails?: string[]
}) => {
  const summary = subject ?? "New integration request"

  const blocks: AnyBlock[] = [
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
        text: `*Integration*\n${sentenceCase(integrationType)}`,
        type: "mrkdwn",
      },
    },
  ]

  if (team) {
    blocks.push({
      type: "section",
      text: {
        text: `*Team details*\n${team.name} (${team.id})`,
        type: "mrkdwn",
      },
    })
  }

  if (silo) {
    blocks.push({
      type: "section",
      text: {
        text: `*Silo details*\n${silo.name} (${silo.id})`,
        type: "mrkdwn",
      },
    })
  }

  extraDetails?.forEach((text) => {
    blocks.push({
      type: "section",
      text: {
        text,
        type: "mrkdwn",
      },
    })
  })

  await sendSlackMessage(
    {
      text: summary,
      blocks,
    },
    "https://hooks.slack.com/services/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",
  )
}
