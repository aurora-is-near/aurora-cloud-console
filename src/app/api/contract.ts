import { initContract } from "@ts-rest/core"
import { z } from "zod"
import { extendZodWithOpenApi } from "@anatine/zod-openapi"
import { CHART_DATE_OPTION_VALUES } from "@/constants/charts"
import { WIDGET_NETWORKS } from "@/constants/bridge"
import { SILO_ASSETS } from "@/constants/assets"
import { FORWARDER_TOKENS } from "@/constants/forwarder-tokens"

extendZodWithOpenApi(z)

const c = initContract()

export const DealSchema = z.object({
  id: z.number(),
  createdAt: z.string(),
  updatedAt: z.string().nullable(),
  deletedAt: z.string().nullable(),
  name: z.string(),
  teamId: z.number(),
  siloId: z.number().nullable(),
  enabled: z.boolean(),
  open: z.boolean(),
  startTime: z.string().nullable(),
  endTime: z.string().nullable(),
})

export const RuleSchema = z.object({
  id: z.number(),
  dealId: z.number(),
  chains: z.array(z.number()),
  contracts: z.array(z.string()),
  exceptChains: z.array(z.number()),
  exceptContracts: z.array(z.string()),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export const SiloBridgedTokenSchema = z.object({
  id: z.number(),
  createdAt: z.string(),
  name: z.string(),
  symbol: z.string(),
  decimals: z.number(),
  aurora_address: z.string().nullable(),
  near_address: z.string().nullable(),
  ethereum_address: z.string().nullable(),
  iconUrl: z.string().nullable(),
  isDeploymentPending: z.boolean(),
})

export const SiloBridgedTokenRequestSchema = z.object({
  id: z.number(),
  createdAt: z.string(),
  symbol: z.string(),
  address: z.string().nullable(),
})

export const SiloSchema = z.object({
  id: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  chainId: z.number(),
  engineAccount: z.string(),
  engineVersion: z.string(),
  genesis: z.string(),
  name: z.string(),
  network: z.string(),
  rpcUrl: z.string(),
  nativeToken: z.object({
    symbol: z.string(),
    name: z.string().nullable(),
    decimals: z.number().nullable(),
  }),
})

export const WalletDetailsSchema = z.object({
  walletAddress: z.string(),
  numberOfTransactions: z.number(),
  firstTransactionAt: z.string(),
  lastTransactionAt: z.string(),
})

export const OracleSchema = z.object({
  createdAt: z.string().nullable(),
  updatedAt: z.string().nullable(),
  address: z.string().nullable(),
})

const FileSchema = z.instanceof(File).openapi({
  type: "string",
  format: "binary",
})

const WidgetNetwork = z.string().openapi({
  enum: WIDGET_NETWORKS,
})

export const WidgetSchema = z.object({
  enabled: z.boolean(),
  createdAt: z.string().nullable(),
  updatedAt: z.string().nullable(),
  fromNetworks: z.array(WidgetNetwork).nullable(),
  toNetworks: z.array(WidgetNetwork).nullable(),
  tokens: z.array(z.number()),
  widgetUrl: z.string().nullable(),
})

export const TransactionDataSchema = z.object({
  label: z.string(),
  transactionsCount: z.number(),
  walletsCount: z.number(),
  transactionsPerDay: z.array(
    z.object({
      day: z.string(),
      count: z.number(),
    }),
  ),
  walletsPerDay: z.array(
    z.object({
      day: z.string(),
      count: z.number(),
    }),
  ),
})

export const ChartDataSchema = z.object({
  label: z.string(),
  chart: z.array(
    z.object({
      day: z.number(),
      count: z.number(),
    }),
  ),
})

const TransactionDataIntervalQueryParamSchema = z.string().optional().openapi({
  enum: CHART_DATE_OPTION_VALUES,
})

const ForwarderToken = z.string().openapi({ enum: [...FORWARDER_TOKENS] })

const SiloWhitelistType = z.union([
  z.literal("MAKE_TRANSACTION"),
  z.literal("DEPLOY_CONTRACT"),
])

export const contract = c.router({
  getDeals: {
    summary: "Get all deals",
    method: "GET",
    path: "/api/deals",
    responses: {
      200: z.object({
        items: z.array(DealSchema),
      }),
    },
    metadata: {
      scopes: ["deals:read"],
    },
  },
  getDeal: {
    summary: "Get a single deal",
    method: "GET",
    path: "/api/deals/:id",
    responses: {
      200: DealSchema,
    },
    metadata: {
      scopes: ["deals:read"],
    },
    pathParams: z.object({
      id: z.number(),
    }),
  },
  createDeal: {
    summary: "Create a deal",
    method: "POST",
    path: "/api/deals",
    responses: {
      200: DealSchema,
    },
    body: z.object({
      name: z.string(),
    }),
    metadata: {
      scopes: ["deals:write"],
    },
  },
  updateDeal: {
    summary: "Update a deal",
    method: "PUT",
    path: "/api/deals/:id",
    responses: {
      200: DealSchema,
    },
    body: z.object({
      name: z.string().optional(),
      open: z.boolean().optional(),
      enabled: z.boolean().optional(),
      startTime: z.string().nullable().optional(),
      endTime: z.string().nullable().optional(),
    }),
    metadata: {
      scopes: ["deals:write"],
    },
    pathParams: z.object({
      id: z.number(),
    }),
  },
  getRules: {
    summary: "Get all rules for a deal",
    method: "GET",
    path: "/api/deals/:id/rules",
    responses: {
      200: z.object({
        items: z.array(RuleSchema),
      }),
    },
    metadata: {
      scopes: ["deals:read"],
    },
    pathParams: z.object({
      id: z.number(),
    }),
  },
  createRule: {
    summary: "Create a rule for a deal",
    method: "POST",
    path: "/api/deals/:id/rules",
    responses: {
      200: RuleSchema,
    },
    body: z.object({
      chains: z.array(z.number()).optional(),
      contracts: z.array(z.string()).optional(),
      exceptChains: z.array(z.number()).optional(),
      exceptContracts: z.array(z.string()).optional(),
    }),
    metadata: {
      scopes: ["deals:write"],
    },
    pathParams: z.object({
      id: z.number(),
    }),
  },
  updateRule: {
    summary: "Update a rule for a deal",
    method: "PUT",
    path: "/api/deals/:id/rules/:rule_id",
    responses: {
      200: RuleSchema,
    },
    body: z.object({
      chains: z.array(z.number()).nullable(),
      contracts: z.array(z.string()).nullable(),
      exceptChains: z.array(z.number()).nullable(),
      exceptContracts: z.array(z.string()).nullable(),
    }),
    metadata: {
      scopes: ["deals:write"],
    },
    pathParams: z.object({
      id: z.number(),
      rule_id: z.number(),
    }),
  },
  getSilos: {
    summary: "Get all silos",
    method: "GET",
    path: "/api/silos",
    responses: {
      200: z.object({
        items: z.array(SiloSchema),
      }),
    },
    metadata: {
      scopes: ["silos:read"],
    },
  },
  getSilo: {
    summary: "Get a single silo",
    method: "GET",
    path: "/api/silos/:id",
    responses: {
      200: SiloSchema,
    },
    metadata: {
      scopes: ["silos:read"],
    },
    pathParams: z.object({
      id: z.number(),
    }),
  },
  getSiloBridgedTokens: {
    summary: "Get the bridged tokens associated with a silo",
    method: "GET",
    path: "/api/silos/:id/tokens",
    responses: {
      200: z.object({
        total: z.number(),
        items: z.array(SiloBridgedTokenSchema),
      }),
    },
    metadata: {
      scopes: ["silos:read"],
    },
    pathParams: z.object({
      id: z.number(),
    }),
  },
  getSiloBridgedTokenRequests: {
    summary: "Get the bridged tokens requested for a silo",
    method: "GET",
    path: "/api/silos/:id/tokens/requests",
    responses: {
      200: z.object({
        total: z.number(),
        items: z.array(SiloBridgedTokenRequestSchema),
      }),
    },
    metadata: {
      scopes: ["silos:read"],
    },
    pathParams: z.object({
      id: z.number(),
    }),
  },
  bridgeSiloToken: {
    summary: "Request bridging of a token for a silo",
    method: "POST",
    path: "/api/silos/:id/tokens/bridge",
    responses: {
      200: z.object({
        isDeploymentPending: z.boolean(),
      }),
    },
    metadata: {
      scopes: ["silos:write"],
    },
    body: z.object({
      tokenId: z.number().optional(),
      symbol: z.string().optional(),
      address: z.string().optional(),
    }),
    pathParams: z.object({
      id: z.number(),
    }),
  },
  getSiloOracle: {
    summary: "Get the oracle configuration for a silo",
    method: "GET",
    path: "/api/silos/:id/oracle",
    responses: {
      200: OracleSchema,
    },
    metadata: {
      scopes: ["silos:read"],
    },
    pathParams: z.object({
      id: z.number(),
    }),
  },
  createSiloOracle: {
    summary: "Create an oracle configuration for a silo",
    method: "POST",
    path: "/api/silos/:id/oracle",
    responses: {
      200: OracleSchema,
    },
    metadata: {
      scopes: ["silos:write"],
    },
    body: z.object({}),
    pathParams: z.object({
      id: z.number(),
    }),
  },
  getWidget: {
    summary: "Get the widget configuration for a silo",
    method: "GET",
    path: "/api/silos/:id/widget",
    responses: {
      200: WidgetSchema,
    },
    metadata: {
      scopes: ["silos:read"],
    },
    pathParams: z.object({
      id: z.number(),
    }),
  },
  updateWidget: {
    summary: "Update the widget configuration for a silo",
    method: "PUT",
    path: "/api/silos/:id/widget",
    responses: {
      200: WidgetSchema,
    },
    metadata: {
      scopes: ["silos:write"],
    },
    body: z.object({
      fromNetworks: z.array(WidgetNetwork).optional(),
      toNetworks: z.array(WidgetNetwork).optional(),
      tokens: z.array(z.number()).optional(),
    }),
    pathParams: z.object({
      id: z.number(),
    }),
  },
  getWallets: {
    summary: "Get details of the wallets that have interacted with your silo",
    method: "GET",
    path: "/api/silos/:id/wallets",
    responses: {
      200: z.object({
        total: z.number(),
        items: z.array(WalletDetailsSchema),
      }),
    },
    query: z.object({
      limit: z.number().optional(),
      offset: z.number().optional(),
      dealId: z.number().optional(),
    }),
    metadata: {
      scopes: ["transactions:read"],
    },
  },
  getWallet: {
    summary:
      "Get details of a single wallet that has interacted with your silo",
    method: "GET",
    path: "/api/silos/:id/wallets/:address",
    responses: {
      200: WalletDetailsSchema,
    },
    query: z.object({
      dealId: z.number().optional(),
    }),
    metadata: {
      scopes: ["transactions:read"],
    },
    pathParams: z.object({
      address: z.string(),
    }),
  },
  uploadSiloAsset: {
    summary: "Upload an asset used in configuring the silo",
    method: "POST",
    path: `/api/silos/:id/assets`,
    contentType: "multipart/form-data",
    body: z.object({
      type: z
        .string()
        .openapi({
          enum: SILO_ASSETS,
        })
        .optional(),
      file: FileSchema.optional(),
    }),
    responses: {
      200: z.object({
        url: z.string(),
      }),
    },
    metadata: {
      scopes: ["assets:write"],
    },
  },
  getSiloTransactions: {
    summary: "Get transaction chart data for a silo",
    method: "GET",
    path: "/api/silos/:id/transactions",
    responses: {
      200: z.object({
        items: z.array(
          z.object({
            siloId: z.number(),
            data: TransactionDataSchema,
          }),
        ),
      }),
    },
    metadata: {
      scopes: ["transactions:read"],
    },
    pathParams: z.object({
      id: z.number(),
    }),
    query: z.object({
      interval: TransactionDataIntervalQueryParamSchema,
    }),
  },
  getSiloPermissions: {
    summary:
      "Get the whitelists for making transactions and deploying contracts",
    method: "GET",
    path: "/api/silos/:id/permissions",
    responses: {
      200: z.object({
        items: z.array(
          z.object({
            type: SiloWhitelistType,
            addresses: z.array(z.string()),
            isEnabled: z.boolean(),
          }),
        ),
      }),
    },
    pathParams: z.object({
      id: z.number(),
    }),
    metadata: {
      scopes: ["silo:read"],
    },
  },
  toggleSiloPermissions: {
    summary:
      "Enable or disable silo permission whitelists for making transactions or deploying contracts",
    method: "PUT",
    path: "/api/silos/:id/permissions",
    responses: {
      200: z.object({
        status: z.union([z.literal("PENDING"), z.literal("SUCCESSFUL")]),
        isEnabled: z.boolean(),
        action: SiloWhitelistType,
      }),
    },
    body: z.object({
      isEnabled: z.boolean(),
      action: SiloWhitelistType,
    }),
    pathParams: z.object({
      id: z.number(),
    }),
    metadata: {
      scopes: ["silo:write"],
    },
  },
  addAddressToPermissionsWhitelist: {
    summary:
      "Whitelist an address for making transactions or deploying contracts",
    method: "POST",
    path: "/api/silos/:id/permissions",
    responses: {
      200: z.object({
        status: z.union([z.literal("PENDING"), z.literal("SUCCESSFUL")]),
        address: z.string(),
        action: SiloWhitelistType,
      }),
    },
    body: z.object({
      address: z.string(),
      action: SiloWhitelistType,
    }),
    pathParams: z.object({
      id: z.number(),
    }),
    metadata: {
      scopes: ["silo:write"],
    },
  },
  removeAddressFromPermissionsWhitelist: {
    summary:
      "Remove an address from the whitelist for making transactions or deploying contracts",
    method: "DELETE",
    path: "/api/silos/:id/permissions",
    responses: {
      200: z.object({
        status: z.union([z.literal("PENDING"), z.literal("SUCCESSFUL")]),
        address: z.string(),
        action: SiloWhitelistType,
      }),
    },
    body: z.object({
      address: z.string(),
      action: SiloWhitelistType,
    }),
    pathParams: z.object({
      id: z.number(),
    }),
    metadata: {
      scopes: ["silo:write"],
    },
  },
  getSiloCollectedGas: {
    summary: "Get collected gas over time for a single silo",
    method: "GET",
    path: "/api/silos/:id/gas-collected",
    responses: {
      200: z.object({
        count: z.number(),
        transactionsCount: z.number(),
        items: z.array(
          z.object({
            day: z.string(),
            count: z.number(),
            transactionsCount: z.number(),
          }),
        ),
      }),
    },
    query: z.object({
      startDate: z.string(),
      endDate: z.string(),
    }),
    metadata: {
      scopes: ["transactions:read"],
    },
    pathParams: z.object({
      id: z.number(),
    }),
  },
  getSiloCollectedGasTotal: {
    summary: "Get collected gas to the moment",
    method: "GET",
    path: "/api/silos/:id/gas-collected-total",
    responses: {
      200: z.object({
        count: z.number(),
      }),
    },
    metadata: {
      scopes: ["transactions:read"],
    },
    pathParams: z.object({
      id: z.number(),
    }),
  },
  getSiloFailureRate: {
    summary: "Get the failure rate chart for a single silo",
    method: "GET",
    path: "/api/silos/:id/failure-rate",
    responses: {
      200: z.object({
        items: z.array(ChartDataSchema),
      }),
    },
    pathParams: z.object({
      id: z.number(),
    }),
    metadata: {
      scopes: ["silos:read"],
    },
  },
  getSiloLatency: {
    summary: "Get latency chart data",
    method: "GET",
    path: "/api/silos/:id/latency",
    responses: {
      200: z.object({
        items: z.array(ChartDataSchema),
      }),
    },
    pathParams: z.object({
      id: z.number(),
    }),
    metadata: {
      scopes: ["silos:read"],
    },
    query: z.object({
      interval: z
        .string()
        .optional()
        .openapi({
          enum: ["now-24h", "now-12h", "now-1h", "now-15m"],
        }),
    }),
  },
  getSiloRpcRequests: {
    summary: "Get RPC request chart data",
    method: "GET",
    path: "/api/silos/:id/rpc-requests",
    responses: {
      200: z.object({
        items: z.array(ChartDataSchema),
      }),
    },
    pathParams: z.object({
      id: z.number(),
    }),
    metadata: {
      scopes: ["silos:read"],
    },
  },
  getForwarderAddress: {
    summary: "Get the forwarder address for given target address",
    method: "GET",
    path: "/api/silos/:id/forwarder/contract/:targetAddress",
    responses: {
      200: z.object({
        forwarderAddress: z.string(),
      }),
    },
    pathParams: z.object({
      id: z.number(),
      targetAddress: z.string(),
    }),
    metadata: {
      scopes: ["forwarder:read"],
    },
  },
  createForwarderAddress: {
    summary: "Create a forwarder address for given target address",
    method: "POST",
    path: "/api/silos/:id/forwarder/contract",
    responses: {
      200: z.object({
        forwarderAddress: z.string().nullable(),
      }),
    },
    pathParams: z.object({
      id: z.number(),
    }),
    body: z.object({
      targetAddress: z.string(),
    }),
    metadata: {
      scopes: ["forwarder:write"],
    },
  },
  getForwarderTokens: {
    summary: "Get the tokens supported by the forwarder",
    method: "GET",
    path: "/api/silos/:id/forwarder/tokens",
    responses: {
      200: z.object({
        items: z.array(
          z.object({
            symbol: ForwarderToken,
            decimals: z.number(),
            contractDeployed: z.boolean(),
            enabled: z.boolean(),
          }),
        ),
      }),
    },
    pathParams: z.object({
      id: z.number(),
    }),
    metadata: {
      scopes: ["forwarder:read"],
    },
  },
  addForwarderTokens: {
    summary: "Add forwarder support for the given token(s)",
    method: "POST",
    path: "/api/silos/:id/forwarder/tokens",
    responses: {
      200: z.object({
        status: z.string(),
      }),
    },
    pathParams: z.object({
      id: z.number(),
    }),
    body: z.object({
      tokens: z.array(ForwarderToken),
    }),
    metadata: {
      scopes: ["forwarder:write"],
    },
  },
  removeForwarderTokens: {
    summary: "Remove forwarder support for the given token(s)",
    method: "DELETE",
    path: "/api/silos/:id/forwarder/tokens",
    responses: {
      200: z.object({
        status: z.string(),
      }),
    },
    pathParams: z.object({
      id: z.number(),
    }),
    body: z.object({
      tokens: z.array(ForwarderToken),
    }),
    metadata: {
      scopes: ["forwarder:write"],
    },
  },
  updateForwarderTokens: {
    summary: "Update forwarder support for the given token(s)",
    method: "PUT",
    path: "/api/silos/:id/forwarder/tokens",
    responses: {
      200: z.object({
        status: z.string(),
      }),
    },
    pathParams: z.object({
      id: z.number(),
    }),
    body: z.object({
      tokens: z.array(ForwarderToken),
    }),
    metadata: {
      scopes: ["forwarder:write"],
    },
  },
  healthcheck: {
    summary: "Perform various checks on the silo and report the status",
    method: "GET",
    path: "/api/silos/:id/healthcheck",
    responses: {
      200: z.object({
        networkStatus: z.union([
          z.literal("ok"),
          z.literal("invalid-network"),
          z.literal("stalled"),
        ]),
        defaultTokensDeployed: z.object({
          NEAR: z.boolean(),
          USDt: z.boolean(),
          USDC: z.boolean(),
          AURORA: z.boolean(),
        }),
        // https://swagger.io/docs/specification/v3_0/data-models/data-types/#free-form-object
        bridgedTokensDeployed: z.instanceof(Object).openapi({
          additionalProperties: {},
        }),
      }),
    },
    pathParams: z.object({
      id: z.number(),
    }),
    metadata: {
      scopes: ["silos:read"],
    },
  },
})
