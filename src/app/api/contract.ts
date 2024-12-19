import { initContract } from "@ts-rest/core"
import { z } from "zod"
import { extendZodWithOpenApi } from "@anatine/zod-openapi"
import { CHART_DATE_OPTION_VALUES } from "@/constants/charts"
import { WIDGET_NETWORKS } from "@/constants/bridge"
import { DEPLOYMENT_STATUSES } from "@/constants/deployment"

extendZodWithOpenApi(z)

const c = initContract()

const DeploymentStatus = z.string().openapi({
  enum: DEPLOYMENT_STATUSES,
})

export const ListSchema = z.object({
  id: z.number(),
  createdAt: z.string(),
  name: z.string(),
})

export const SimpleListSchema = z.object({
  id: z.number(),
  name: z.string(),
})

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
  resourceDefinition: z.object({}).nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

const DealPrioritiesSchema = z.array(
  z.object({
    dealId: z.number(),
    name: z.string(),
    priority: z.string(),
  }),
)

export const TokenSchema = z.object({
  address: z.string(),
  createdAt: z.string(),
  id: z.number(),
  symbol: z.string(),
  name: z.string().nullable(),
  decimals: z.number().nullable(),
  iconUrl: z.string().nullable(),
  type: z.string().nullable(),
  deploymentStatus: DeploymentStatus,
  bridge: z
    .object({
      deploymentStatus: DeploymentStatus,
      isFast: z.boolean(),
      addresses: z.array(
        z.object({
          network: z.string(),
          address: z.string(),
        }),
      ),
      origin: z.string().nullable(),
    })
    .nullable(),
})

export const SiloSchema = z.object({
  id: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  chainId: z.string(),
  engineAccount: z.string(),
  engineVersion: z.string(),
  genesis: z.string(),
  name: z.string(),
  network: z.string(),
  rpcUrl: z.string(),
  nativeToken: TokenSchema.nullable(),
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
  getDealPriorities: {
    summary: "Get deal execution priorities",
    method: "GET",
    path: "/api/deals/priorities",
    responses: {
      200: z.object({
        items: DealPrioritiesSchema,
      }),
    },
    metadata: {
      scopes: ["deals:read"],
    },
  },
  updateDealPriorities: {
    summary: "Update deal execution priorities",
    method: "PUT",
    path: "/api/deals/priorities",
    responses: {
      200: z.object({
        items: DealPrioritiesSchema,
      }),
    },
    body: z.object({
      priorities: z.array(
        z.object({
          dealId: z.number(),
          priority: z.string(),
        }),
      ),
    }),
    metadata: {
      scopes: ["deals:write"],
    },
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
      resourceDefinition: z.object({}).nullable(),
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
      resourceDefinition: z.object({}).nullable(),
    }),
    metadata: {
      scopes: ["deals:write"],
    },
    pathParams: z.object({
      id: z.number(),
      rule_id: z.number(),
    }),
  },
  getFilters: {
    summary: "Get all filters for a deal",
    method: "GET",
    path: "/api/deals/:id/filters",
    responses: {
      200: z.object({
        items: z.array(
          z.object({
            id: z.number(),
            filter_type: z.string().optional(),
            blacklist: z.boolean(),
            created_at: z.string(),
            updated_at: z.string(),
          }),
        ),
      }),
    },
    pathParams: z.object({
      id: z.number(),
    }),
    metadata: {
      scopes: ["deals:read"],
    },
  },
  getFilter: {
    summary: "Get a single filter",
    method: "GET",
    path: "/api/deals/:id/filters/:filter_id",
    responses: {
      200: z.object({
        id: z.number(),
        deal_id: z.number(),
        filter_type: z.enum([
          "USER",
          "CONTRACT",
          "CHAIN",
          "EOA",
          "TOKEN",
          "IP",
        ]),
        blacklist: z.boolean(),
        created_at: z.string(),
        updated_at: z.string(),
        deleted_at: z.string().nullable(),
      }),
    },
    pathParams: z.object({
      id: z.number(),
      filter_id: z.number(),
    }),
    metadata: {
      scopes: ["deals:read"],
    },
  },
  updateFilter: {
    summary: "Update a filter",
    method: "PUT",
    path: "/api/deals/:id/filters/:filter_id",
    body: z.object({
      value: z.string(),
      filter_type: z.string().optional(),
    }),
    responses: {
      200: z.object({
        id: z.number(),
        filter_type: z.string().optional(),
        blacklist: z.boolean(),
        created_at: z.string(),
        updated_at: z.string(),
      }),
    },
    pathParams: z.object({
      id: z.number(),
      filter_id: z.number(),
    }),
    metadata: {
      scopes: ["deals:write"],
    },
  },
  getFilterEntries: {
    summary: "Get all entries for a filter",
    method: "GET",
    path: "/api/deals/:id/filters/:filter_id/entries",
    responses: {
      200: z.object({
        items: z.array(
          z.object({
            id: z.number(),
            filter_id: z.number(),
            value: z.string(),
          }),
        ),
      }),
    },
    pathParams: z.object({
      id: z.number(),
      filter_id: z.number(),
    }),
    metadata: {
      scopes: ["deals:read"],
    },
  },
  updateFilterEntries: {
    summary: "Update the entries for a filter",
    method: "PUT",
    path: "/api/deals/:id/filters/:filter_id/entries",
    responses: {
      200: z.object({
        items: z.array(
          z.object({
            id: z.number(),
            value: z.string(),
          }),
        ),
      }),
    },
    body: z.object({
      items: z.array(
        z.object({
          value: z.string(),
        }),
      ),
    }),
    pathParams: z.object({
      id: z.number(),
      filter_id: z.number(),
    }),
    metadata: {
      scopes: ["deals:write"],
    },
  },
  deleteFilterEntry: {
    summary: "Delete filter entries",
    method: "DELETE",
    path: "/api/deals/:id/filters/:filter_id/entries/:entry_id",
    responses: {
      204: null,
    },
    body: null,
    metadata: {
      scopes: ["deals:write"],
    },
    pathParams: z.object({
      id: z.number(),
      filter_id: z.number(),
      entry_id: z.number(),
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
  getSiloTokens: {
    summary: "Get the tokens associated with a silo",
    method: "GET",
    path: "/api/silos/:id/tokens",
    responses: {
      200: z.object({
        items: z.array(TokenSchema),
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
        status: DeploymentStatus,
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
  getLists: {
    summary: "Get all lists",
    method: "GET",
    path: "/api/lists",
    responses: {
      200: z.object({
        items: z.array(ListSchema),
      }),
    },
    metadata: {
      scopes: ["lists:read"],
    },
  },
  getList: {
    summary: "Get a single list",
    method: "GET",
    path: "/api/lists/:id",
    responses: {
      200: ListSchema,
    },
    metadata: {
      scopes: ["lists:read"],
    },
    pathParams: z.object({
      id: z.number(),
    }),
  },
  createList: {
    summary: "Create a list",
    method: "POST",
    path: "/api/lists",
    responses: {
      200: ListSchema,
    },
    body: z.object({
      name: z.string(),
    }),
    metadata: {
      scopes: ["lists:write"],
    },
  },
  updateList: {
    summary: "Update a list",
    method: "PUT",
    path: "/api/lists/:id",
    responses: {
      200: ListSchema,
    },
    body: z.object({
      name: z.string(),
    }),
    metadata: {
      scopes: ["lists:write"],
    },
    pathParams: z.object({
      id: z.number(),
    }),
  },
  deleteList: {
    summary: "Delete a list",
    method: "DELETE",
    path: "/api/lists/:id",
    responses: {
      204: null,
    },
    metadata: {
      scopes: ["lists:write"],
    },
    pathParams: z.object({
      id: z.number(),
    }),
    body: null,
  },
  getListItems: {
    summary: "Get the items in a list",
    method: "GET",
    path: "/api/lists/:id/items",
    responses: {
      200: z.object({
        total: z.number(),
        items: z.array(z.string()),
      }),
    },
    metadata: {
      scopes: ["lists:read"],
    },
    query: z.object({
      limit: z.number().optional(),
      cursor: z.string().optional(),
    }),
    pathParams: z.object({
      id: z.number(),
    }),
  },
  createListItems: {
    summary: "Add items to a list",
    method: "POST",
    path: "/api/lists/:id/items",
    responses: {
      200: z.object({
        count: z.number(),
      }),
    },
    body: z.object({
      items: z.array(z.string()),
    }),
    metadata: {
      scopes: ["lists:write"],
    },
    pathParams: z.object({
      id: z.number(),
    }),
  },
  getListItem: {
    summary: "Get a single item from a list",
    method: "GET",
    path: "/api/lists/:id/items/:item",
    responses: {
      200: z.string(),
    },
    metadata: {
      scopes: ["lists:read"],
    },
    pathParams: z.object({
      id: z.number(),
      item: z.string(),
    }),
  },
  deleteListItem: {
    summary: "Remove an item from a list",
    method: "DELETE",
    path: "/api/lists/:id/items/:item",
    responses: {
      204: null,
    },
    metadata: {
      scopes: ["lists:write"],
    },
    body: null,
    pathParams: z.object({
      id: z.number(),
      item: z.string(),
    }),
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
    path: "/api/forwarder/:address",
    responses: {
      200: z.object({
        forwarderAddress: z.string(),
      }),
    },
    pathParams: z.object({
      address: z.string(),
    }),
    metadata: {
      scopes: ["forwarder:read"],
    },
  },
  createForwarderAddress: {
    summary: "Create a forwarder address for given target address",
    method: "POST",
    path: "/api/forwarder",
    responses: {
      200: z.object({
        forwarderAddress: z.string().nullable(),
      }),
    },
    body: z.object({
      address: z.string(),
    }),
    metadata: {
      scopes: ["forwarder:write"],
    },
  },
})
