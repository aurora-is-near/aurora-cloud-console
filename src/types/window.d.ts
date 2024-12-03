type Ethereum = import("ethers").providers.ExternalProvider

interface Window {
  ethereum?: Ethereum
  __BROWSER_GLOBAL__: import("puppeteer").Browser
}
