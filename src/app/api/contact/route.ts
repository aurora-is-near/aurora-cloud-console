import { NextRequest, NextResponse } from "next/server"
import { ApiRequestContext, apiRequestHandler } from "@/utils/api"
import { ApiUser } from "@/types/types"
import { abort } from "@/utils/abort"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { getTeam } from "@/actions/admin/teams/get-team"

const getEnvVar = (name: string) => {
  const value = process.env[name]

  if (!value) {
    throw new Error(`Missing environment variable: ${name}`)
  }

  return value
}

const getUserTeam = async (userId: number) => {
  const supabase = createAdminSupabaseClient()
  const { data } = await supabase
    .from("teams")
    .select("*, users_teams!inner(user_id)")
    .eq("users_teams.user_id", userId)
    .single()

  return data
}

/**
 * Submit a form to Hubspot.
 * @see https://legacydocs.hubspot.com/docs/methods/forms/submit_form_v3_authentication
 */
const submitForm = async (
  user: ApiUser,
  subject: string,
  message: string,
  pageUri: string,
) => {
  const accessToken = getEnvVar("HUBSPOT_ACCESS_TOKEN")
  const portalId = getEnvVar("HUBSPOT_PORTAL_ID")
  const contactFormGuid = getEnvVar("HUBSPOT_CONTACT_FORM_GUID")

  if (!accessToken || !portalId || !contactFormGuid) {
    return
  }

  const team = await getUserTeam(user.id)

  const res = await fetch(
    `https://api.hsforms.com/submissions/v3/integration/secure/submit/${portalId}/${contactFormGuid}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        submittedAt: Date.now(),
        fields: [
          {
            objectTypeId: "0-1",
            name: "email",
            value: user.email,
          },
          {
            objectTypeId: "0-1",
            name: "firstname",
            value: user.name,
          },
          {
            objectTypeId: "0-2",
            name: "name",
            value: team?.name,
          },
          {
            objectTypeId: "0-2",
            name: "domain",
            value: team?.website,
          },
          {
            objectTypeId: "0-1",
            name: "subject",
            value: subject,
          },
          {
            objectTypeId: "0-1",
            name: "message",
            value: message,
          },
        ],
        context: {
          pageUri,
        },
      }),
    },
  )

  const data = await res.json()

  // https://legacydocs.hubspot.com/docs/faq/api-error-responses
  if (res.status >= 400 && res.status < 600) {
    abort(res.status, data.message ?? "Unknown error")
  }
}

export const POST = apiRequestHandler(
  ["admin"],
  async (req: NextRequest, ctx: ApiRequestContext) => {
    const { user } = ctx
    const { subject, message, pageUri } = await req.json()

    await submitForm(user, subject, message, pageUri)

    return { status: "OK" }
  },
)
