import type { ReactNode } from "react"

// 서버 요청과 프론트 목록 조회에서 함께 사용하는 방송 유형이다.
export type BroadcastType = "lb" | "hs"

// 서버: 외부 방송 API 응답을 검증하고 정규화할 때 사용하는 원본 데이터 타입이다.
export type LiveBroadcast = {
  objectID: string
  platform_id: string
  datetime_start: string
  product_cnt: number
  visit_cnt: number | null
  sales_cnt: number | null
  sales_amt: number | null
  title: string
  cid: number
  ad_channel?: string[]
}

export type HomeshoppingBroadcast = {
  hsshow_id: string
  platform_id: string
  platform_name: string
  hsshow_title: string
  hsshow_datetime_start: string
  hsshow_datetime_end: string
  hsshow_url_live: string | null
  item_cnt: number
  cid: number
  sales_cnt: number | null
  sales_amt: number | null
  cat: {
    cid: number
    cat_name: string
  }
  visit_cnt: number | null
}

export type BroadcastByType = {
  lb: LiveBroadcast
  hs: HomeshoppingBroadcast
}

export type ExternalBroadcastResponse<T extends BroadcastType> = {
  list: BroadcastByType[T][]
  mask: boolean
}

// 서버: API Route가 프론트에 반환하는 방송 유형별 응답 타입이다.
export type BroadcastApiResponse =
  | {
      type: "lb"
      list: LiveBroadcast[]
      mask: boolean
    }
  | {
      type: "hs"
      list: HomeshoppingBroadcast[]
      mask: boolean
    }

// 프론트: 원본 방송 데이터를 목록 UI에 표시할 형태로 정규화한 타입이다.
export type BroadcastMetricKey = "visitCount" | "audienceRating" | "salesCount" | "salesAmount"

export type BroadcastMetric = {
  key: BroadcastMetricKey
  label: string
  value: number | null
}

export type BroadcastItem = {
  id: string
  rank: number
  platformName: string
  title: string
  categoryName: string
  broadcastDate: string
  broadcastTime: string
  productCount: number
  metrics: BroadcastMetric[]
}

export type BroadcastListResponse = {
  type: BroadcastType
  list: BroadcastItem[]
  mask: boolean
}

// 프론트: 방송 목록 컴포넌트에 전달하는 Props 타입이다.
export type BroadcastItemProps = {
  item: BroadcastItem
  isMasked: boolean
  isHomeshopping?: boolean
}

export type BroadcastMetricValueProps = {
  metric: BroadcastMetric
  isMasked: boolean
  showLoginText?: boolean
  showPreparing?: boolean
}

export type BroadcastListProps = {
  items: BroadcastItem[]
  type: BroadcastType
  isMasked: boolean
}

export type BroadcastTypeToggleProps = {
  selectedType: BroadcastType
  onChange: (type: BroadcastType) => void
}

export type BroadcastTypeOption = {
  label: string
  value: BroadcastType
}

// 프론트: 앱 전체에 React Query Client를 제공하는 Provider의 Props 타입이다.
export type ReactQueryProviderProps = {
  children: ReactNode
}
