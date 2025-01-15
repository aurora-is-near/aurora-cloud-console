const EMAIL_FROM = "console@auroracloud.dev"

export const sendEmail = async (body: {
  To: string
  Subject: string
  HtmlBody: string
}) =>
  fetch("https://api.postmarkapp.com/email", {
    method: "POST",
    headers: {
      "X-Postmark-Server-Token": process.env.POSTMARK_SERVER_TOKEN,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      From: EMAIL_FROM,
      ...body,
    }),
  })
