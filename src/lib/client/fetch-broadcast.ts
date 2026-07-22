import { normalizeBroadcastResponse } from "@/lib/client/broadcast"
import type { BroadcastApiResponse, BroadcastListResponse, BroadcastType } from "@/lib/types/broadcast"

export async function fetchBroadcastList(type: BroadcastType): Promise<BroadcastListResponse> {
  const response = await fetch("/api/broadcast", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type }),
  })

  if (!response.ok) {
    throw new Error("방송 목록을 불러오지 못했습니다.")
  }

  return normalizeBroadcastResponse((await response.json()) as BroadcastApiResponse)
}
