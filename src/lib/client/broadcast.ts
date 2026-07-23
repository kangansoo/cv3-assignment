import type { BroadcastApiResponse, BroadcastItem, BroadcastListResponse, BroadcastMetric, HomeshoppingBroadcast, LiveBroadcast } from "@/lib/types/broadcast"

const livePlatformNames: Record<string, string> = {
  naver: "네이버쇼핑LIVE",
  kakao: "카카오쇼핑LIVE",
  gsshop: "GS SHOP 라이브",
  cjonstyle: "CJ온스타일",
  hmall: "현대Hmall 라이브",
}

const liveCategoryNames: Record<number, string> = {
  50000096: "식품/건강",
  50000142: "출산/육아",
  50000151: "생활/건강",
  50000153: "생활/건강",
  50000166: "패션의류",
  50000167: "패션의류",
  50000208: "식품/건강",
  50000209: "식품/건강",
  50000210: "식품/건강",
  50000212: "식품/건강",
  50000213: "식품/건강",
  50007252: "가구/인테리어",
}

export function getLivePlatformName(platformId: string) {
  return livePlatformNames[platformId] ?? platformId
}

function formatDateTime(value: string) {
  const normalizedValue = value.length === 10 ? `20${value}` : value
  const year = Number(normalizedValue.slice(0, 4))
  const month = Number(normalizedValue.slice(4, 6))
  const day = Number(normalizedValue.slice(6, 8))
  const hour = normalizedValue.slice(8, 10)
  const minute = normalizedValue.slice(10, 12)
  const dayNames = ["일", "월", "화", "수", "목", "금", "토"]
  const dayName = dayNames[new Date(year, month - 1, day).getDay()]

  return {
    date: `${String(year).slice(2)}.${String(month).padStart(2, "0")}.${String(day).padStart(2, "0")} (${dayName})`,
    shortDate: `${String(month).padStart(2, "0")}.${String(day).padStart(2, "0")}`,
    time: `${hour}:${minute}`,
  }
}

function createMetrics(visitCount: number | null, salesCount: number | null, salesAmount: number | null): BroadcastMetric[] {
  return [
    { key: "visitCount", label: "조회수", value: visitCount },
    { key: "salesCount", label: "판매수", value: salesCount },
    { key: "salesAmount", label: "매출액", value: salesAmount },
  ]
}

function createHomeshoppingMetrics(salesCount: number | null, salesAmount: number | null): BroadcastMetric[] {
  return [
    { key: "audienceRating", label: "시청률", value: null },
    { key: "salesCount", label: "판매수", value: salesCount },
    { key: "salesAmount", label: "매출액", value: salesAmount },
  ]
}

function normalizeLiveBroadcast(broadcast: LiveBroadcast, rank: number): BroadcastItem {
  const dateTime = formatDateTime(broadcast.datetime_start)

  return {
    id: broadcast.objectID,
    rank,
    platformName: getLivePlatformName(broadcast.platform_id),
    title: broadcast.title,
    categoryName: liveCategoryNames[broadcast.cid] ?? "분류 미정",
    broadcastDate: dateTime.date,
    broadcastTime: dateTime.time,
    productCount: broadcast.product_cnt,
    metrics: createMetrics(broadcast.visit_cnt, broadcast.sales_cnt, broadcast.sales_amt),
  }
}

function normalizeHomeshoppingBroadcast(broadcast: HomeshoppingBroadcast, rank: number): BroadcastItem {
  const dateTime = formatDateTime(broadcast.hsshow_datetime_start)

  return {
    id: broadcast.hsshow_id,
    rank,
    platformName: broadcast.platform_name,
    title: broadcast.hsshow_title,
    categoryName: broadcast.cat.cat_name,
    broadcastDate: dateTime.date,
    broadcastTime: dateTime.time,
    productCount: broadcast.item_cnt,
    metrics: createHomeshoppingMetrics(broadcast.sales_cnt, broadcast.sales_amt),
  }
}

export function getShortBroadcastDate(broadcastDate: string) {
  return broadcastDate.slice(3, 8)
}

export function normalizeBroadcastResponse(response: BroadcastApiResponse): BroadcastListResponse {
  const list = response.list.map((broadcast, index) => {
    const rank = index + 1

    return response.type === "lb" ? normalizeLiveBroadcast(broadcast as LiveBroadcast, rank) : normalizeHomeshoppingBroadcast(broadcast as HomeshoppingBroadcast, rank)
  })

  return { type: response.type, list, mask: response.mask }
}
