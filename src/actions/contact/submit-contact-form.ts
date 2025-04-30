"use server"

import { abort } from "@/utils/abort"
import { getCurrentUser } from "@/actions/current-user/get-current-user"
import { getTeamByKey } from "@/actions/teams/get-team-by-key"
import { getAuthUser } from "@/actions/auth-user/get-auth-user"

const getEnvVar = (name: string) => {
  const value = process.env[name]

  if (!value) {
    throw new Error(`Missing environment variable: ${name}`)
  }

  return value
}

/**
 * Submit a form to Hubspot.
 * @see https://legacydocs.hubspot.com/docs/methods/forms/submit_form_v3_authentication
 */
export const submitContactForm = async ({
  subject,
  message,
  pageUri,
  teamKey,
  telegramHandle,
}: {
  subject: string
  message: string
  pageUri: string
  teamKey?: string
  telegramHandle?: string
}) => {
  const isAuthenticated = !!(await getAuthUser())

  const [user, team] = await Promise.all([
    isAuthenticated ? getCurrentUser() : null,
    teamKey ? getTeamByKey(teamKey) : null,
  ])

  const accessToken = getEnvVar("HUBSPOT_ACCESS_TOKEN")
  const portalId = getEnvVar("HUBSPOT_PORTAL_ID")
  const contactFormGuid = getEnvVar("HUBSPOT_CONTACT_FORM_GUID")

  if (!accessToken || !portalId || !contactFormGuid) {
    return
  }

  const optionalFields = [
    {
      objectTypeId: "0-1",
      name: "email",
      value: user?.email,
    },
    {
      objectTypeId: "0-1",
      name: "firstname",
      value: user?.name,
    },
    {
      objectTypeId: "0-2",
      name: "name",
      value: team?.name,
    },
    {
      objectTypeId: "0-2",
      name: "telegramHandle",
      value: telegramHandle,
    },
  ].filter((field) => !!field.value)

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
          ...optionalFields,
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
        ].filter((field) => !!field.value),
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
