type Ethereum = import("ethers").providers.ExternalProvider

interface Window {
  ethereum?: Ethereum
}
