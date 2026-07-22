import type { BroadcastType, ExternalBroadcastResponse } from "@/lib/types/broadcast"
import {
  externalBroadcastResponseSchema,
  homeshoppingBroadcastSchema,
  liveBroadcastSchema,
} from "./broadcast-schema"

const BROADCAST_API_URL = "https://live.ecomm-data.com/api/assignment/list"

export async function fetchBroadcast<T extends BroadcastType>(type: T): Promise<ExternalBroadcastResponse<T>> {
  const response = await fetch(BROADCAST_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ type }),
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error(`외부 API 요청 실패. 상태 코드: ${response.status}`)
  }

  const responseBody: unknown = await response.json()
  const parsedResponse = externalBroadcastResponseSchema.safeParse(responseBody)

  if (!parsedResponse.success) {
    throw new Error("외부 API 응답 형식이 올바르지 않습니다.")
  }

  const itemSchema = type === "lb" ? liveBroadcastSchema : homeshoppingBroadcastSchema
  const list = parsedResponse.data.list.flatMap((item) => {
    const parsedItem = itemSchema.safeParse(item)

    return parsedItem.success ? [parsedItem.data] : []
  })

  return {
    list,
    mask: parsedResponse.data.mask,
  } as ExternalBroadcastResponse<T>
}
