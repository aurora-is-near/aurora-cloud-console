import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(req: NextRequest) {
  try {
    const { subject, message, page } = await req.json()

    const supabase = createRouteHandlerClient({ cookies })
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) throw new Error("No user found.")

    // const response = await fetch("https://api.postmarkapp.com/email", {
    //   method: "POST",
    //   headers: {
    //     "X-Postmark-Server-Token": process.env.POSTMARK_SERVER_TOKEN!,
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     From: "support@auroracloud.dev",
    //     To: "support@auroracloud.dev",
    //     Subject: subject,
    //     HtmlBody: `
    //     <p><strong>Submitted on page:</strong> ${page}</p>
    //     <p><strong>Email:</strong> ${user.email}</p>
    //     <p><strong>Subject:</strong> ${subject}</p>
    //     <p><strong>Message:</strong> ${message}</p>
    //     `,
    //   }),
    // })

    // const { ErrorCode } = await response.json()

    // if (ErrorCode !== 0) throw ErrorCode

    return NextResponse.json({ message: "Message sent." }, { status: 200 })
  } catch (error: any) {
    console.log(error)
    return NextResponse.json(
      { message: error.message || "Something went wrong. Please try again." },
      { status: error.status || 500 },
    )
  }
}
