import { MessageAttachment } from "@slack/types"

const SLACK_WEBHOOK_URL =
  "https://hooks.slack.com/services/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"

export const sendSlackMessage = async (
  message: MessageAttachment,
  webhookUrl: string = SLACK_WEBHOOK_URL,
) => {
  await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  })
}
