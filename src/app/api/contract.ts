import { initContract } from "@ts-rest/core"
import { z } from "zod"
import { extendZodWithOpenApi } from "@anatine/zod-openapi"

extendZodWithOpenApi(z)

const c = initContract()

const DealSchema = z.object({
  id: z.number(),
  created_at: z.string(),
  name: z.string(),
  team_id: z.number(),
})

const DealPrioritiesSchema = z.array(
  z.object({
    dealId: z.number(),
    name: z.string(),
    priority: z.string(),
  }),
)

const SiloSchema = z.object({
  id: z.number(),
  created_at: z.string(),
  chain_id: z.string(),
  engine_account: z.string(),
  engine_version: z.string(),
  genesis: z.string(),
  name: z.string(),
  network: z.string(),
  rpc_url: z.string(),
})

const ListSchema = z.object({
  id: z.number(),
  created_at: z.string(),
  name: z.string(),
  team_id: z.number(),
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
  getDealEnabled: {
    summary: "Check if a deal is enabled",
    method: "GET",
    path: "/api/deals/:id/enabled",
    responses: {
      200: z.object({
        enabled: z.boolean(),
      }),
    },
    metadata: {
      scopes: ["deals:read"],
    },
  },
  updateDealEnabled: {
    summary: "Enable or disable a deal",
    method: "PUT",
    path: "/api/deals/:id/enabled",
    responses: {
      200: z.object({
        enabled: z.boolean(),
      }),
    },
    metadata: {
      scopes: ["deals:write"],
    },
    body: z.object({
      enabled: z.boolean(),
    }),
  },
  getDealStartTime: {
    summary: "Get the start time for a deal",
    method: "GET",
    path: "/api/deals/:id/start-time",
    responses: {
      200: z.object({
        startTime: z.date().nullable(),
      }),
    },
    metadata: {
      scopes: ["deals:read"],
    },
  },
  setDealStartTime: {
    summary: "Set the start time for a deal",
    method: "POST",
    path: "/api/deals/:id/start-time",
    responses: {
      200: z.object({
        startTime: z.date().nullable(),
      }),
    },
    metadata: {
      scopes: ["deals:write"],
    },
    body: z.object({
      startTime: z.date(),
    }),
  },
  deleteDealStartTime: {
    summary: "Delete the start time for a deal",
    method: "DELETE",
    path: "/api/deals/:id/start-time",
    responses: {
      204: null,
    },
    metadata: {
      scopes: ["deals:write"],
    },
    body: null,
  },
  getDealEndTime: {
    summary: "Get the end time for a deal",
    method: "GET",
    path: "/api/deals/:id/end-time",
    responses: {
      200: z.object({
        endTime: z.date().nullable(),
      }),
    },
    metadata: {
      scopes: ["deals:read"],
    },
  },
  setDealEndTime: {
    summary: "Set the end time for a deal",
    method: "POST",
    path: "/api/deals/:id/end-time",
    responses: {
      200: z.object({
        endTime: z.date().nullable(),
      }),
    },
    metadata: {
      scopes: ["deals:write"],
    },
    body: z.object({
      endTime: z.date(),
    }),
  },
  deleteDealEndTime: {
    summary: "Delete the end time for a deal",
    method: "DELETE",
    path: "/api/deals/:id/end-time",
    responses: {
      204: null,
    },
    metadata: {
      scopes: ["deals:write"],
    },
    body: null,
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
    summary: "Get the wallets that have interacted with your silos",
    method: "GET",
    path: "/api/wallets",
    responses: {
      200: z.object({
        total: z.number(),
        items: z.array(
          z.object({
            walletAddress: z.string(),
            numberOfTransactions: z.number(),
            firstTransactionAt: z.string(),
            lastTransactionAt: z.string(),
          }),
        ),
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
