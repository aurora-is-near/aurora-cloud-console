import { GraphQLClient } from "graphql-request"

const DATOCMS_ENDPOINT = "https://graphql.datocms.com"
const READ_ONLY_API_TOKEN = "c41a51b9acf5d51eff3e370141769c"

export const createGraphqlClient = ({
  preview,
}: {
  preview?: boolean
} = {}) =>
  new GraphQLClient(DATOCMS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${READ_ONLY_API_TOKEN}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(preview ? { "X-Include-Drafts": "true" } : {}),
    },
  })
