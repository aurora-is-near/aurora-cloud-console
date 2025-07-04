import Cryptr from "cryptr"

const getCryptr = () => {
  const encryptionKey = process.env.BLOCKSCOUT_ENCRYPTION_KEY

  if (!encryptionKey) {
    throw new Error("BLOCKSCOUT_ENCRYPTION_KEY is not set.")
  }

  return new Cryptr(encryptionKey)
}

export const encryptBlockscoutPassword = (password: string): string => {
  const cryptr = getCryptr()

  return cryptr.encrypt(password)
}

export const decryptBlockscoutPassword = (
  encryptedPassword: string,
): string => {
  const cryptr = getCryptr()

  return cryptr.decrypt(encryptedPassword)
}
