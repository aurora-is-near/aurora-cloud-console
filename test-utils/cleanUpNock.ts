import nock from "nock"

export const cleanUpNock = () => {
  nock.restore()
  nock.cleanAll()
  nock.enableNetConnect()
  nock.activate()
}
