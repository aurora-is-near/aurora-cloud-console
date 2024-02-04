import { initContract } from "@ts-rest/core"
import { z } from "zod"
import { extendZodWithOpenApi } from "@anatine/zod-openapi"

extendZodWithOpenApi(z)

const c = initContract()

export const DealSchema = z.object({
  id: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  name: z.string(),
  teamId: z.number(),
  enabled: z.boolean(),
  startTime: z.string().nullable(),
  endTime: z.string().nullable(),
  lists: z.object({
    chainFilter: z.number().nullable(),
    contractFilter: z.number().nullable(),
    eoaFilter: z.number().nullable(),
    eoaBlacklist: z.number().nullable(),
  }),
})

export const DealPrioritiesSchema = z.array(
  z.object({
    dealId: z.number(),
    name: z.string(),
    priority: z.string(),
  }),
)

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
})

export const ListSchema = z.object({
  id: z.number(),
  createdAt: z.string(),
  name: z.string(),
  teamId: z.number(),
})

export const WalletDetailsSchema = z.object({
  walletAddress: z.string(),
  numberOfTransactions: z.number(),
  firstTransactionAt: z.string(),
  lastTransactionAt: z.string(),
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
  },
  updateDeal: {
    summary: "Update a deal",
    method: "PUT",
    path: "/api/deals/:id",
    responses: {
      200: DealSchema,
    },
    body: z.object({
      enabled: z.boolean().optional(),
      startTime: z.string().nullable().optional(),
      endTime: z.string().nullable().optional(),
    }),
    metadata: {
      scopes: ["deals:write"],
    },
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
  },
  getWallets: {
    summary: "Get details of the wallets that have interacted with your silos",
    method: "GET",
    path: "/api/wallets",
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
      "Get details of a single wallets that has interacted with your silos",
    method: "GET",
    path: "/api/wallets/:address",
    responses: {
      200: WalletDetailsSchema,
    },
    query: z.object({
      dealId: z.number().optional(),
    }),
    metadata: {
      scopes: ["transactions:read"],
    },
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
      offset: z.number().optional(),
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
  },
})
