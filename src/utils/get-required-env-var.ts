export const getRequiredEnvVar = (key: string): string => {
  const value = process.env[key]

  if (!value) {
    throw new Error(`The ${key} environment variable must be set`)
  }

  return value
}
