import { z } from "zod"

import type { HomeshoppingBroadcast, LiveBroadcast } from "@/lib/types/broadcast"

export const broadcastRequestSchema = z
  .object({
    type: z.enum(["lb", "hs"]),
  })
  .strip()

export const externalBroadcastResponseSchema = z
  .object({
    list: z.array(z.unknown()),
    mask: z.boolean(),
  })
  .strip()

export const liveBroadcastSchema = z
  .object({
    objectID: z.string(),
    platform_id: z.string(),
    datetime_start: z.string(),
    product_cnt: z.number(),
    visit_cnt: z.number().nullable(),
    sales_cnt: z.number().nullable(),
    sales_amt: z.number().nullable(),
    title: z.string(),
    cid: z.number(),
    ad_channel: z.array(z.string()).optional(),
  })
  .strip() satisfies z.ZodType<LiveBroadcast>

export const homeshoppingBroadcastSchema = z
  .object({
    hsshow_id: z.string(),
    platform_id: z.string(),
    platform_name: z.string(),
    hsshow_title: z.string(),
    hsshow_datetime_start: z.string(),
    hsshow_datetime_end: z.string(),
    hsshow_url_live: z.string().nullable(),
    item_cnt: z.number(),
    cid: z.number(),
    sales_cnt: z.number().nullable(),
    sales_amt: z.number().nullable(),
    cat: z
      .object({
        cid: z.number(),
        cat_name: z.string(),
      })
      .strip(),
    visit_cnt: z.number().nullable(),
  })
  .strip() satisfies z.ZodType<HomeshoppingBroadcast>
