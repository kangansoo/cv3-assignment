export type BroadcastType = "live" | "homeshopping"

export type ViewMetricLabel = "조회수" | "시청률"

export type RawBroadcast = {
  objectID: string
  platform_id: string
  datetime_start: string
  product_cnt: number
  visit_cnt: number | null
  sales_cnt: number | null
  sales_amt: number | null
  title: string
  cid: number
}

export type BroadcastMetric = {
  label: ViewMetricLabel | "판매" | "매출"
  value: number
  locked: boolean
}

export type BroadcastItem = {
  id: string
  rank: number
  platformName: string
  title: string
  broadcastDate: string
  metrics: BroadcastMetric[]
}

export type BroadcastListResponse = {
  type: BroadcastType
  list: BroadcastItem[]
}
