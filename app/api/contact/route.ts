import { NextRequest, NextResponse } from "next/server"
import { ApiRequestContext, apiRequestHandler } from "@/utils/api"

export const POST = apiRequestHandler(
  ["admin"],
  async (req: NextRequest, ctx: ApiRequestContext) => {
    const { user } = ctx
    const { subject, message, page } = await req.json()

    const response = await fetch("https://api.postmarkapp.com/email", {
      method: "POST",
      headers: {
        "X-Postmark-Server-Token": process.env.POSTMARK_SERVER_TOKEN,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        From: "support@auroracloud.dev",
        To: "support@auroracloud.dev",
        Subject: subject,
        HtmlBody: `
        <p><strong>Submitted on page:</strong> ${page}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong> ${message}</p>
        `,
      }),
    })

    const { ErrorCode } = await response.json()

    if (ErrorCode !== 0) throw ErrorCode

    return NextResponse.json({ status: "OK" })
  },
)
