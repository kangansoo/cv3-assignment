import { NextRequest, NextResponse } from "next/server"

import { broadcastRequestSchema } from "@/lib/server/broadcast-schema"
import { fetchBroadcast } from "@/lib/server/fetch-broadcast"
import type { BroadcastApiResponse } from "@/lib/types/broadcast"

export async function POST(request: NextRequest) {
  try {
    const requestBody: unknown = await request.json()
    const parsedRequest = broadcastRequestSchema.safeParse(requestBody)

    if (!parsedRequest.success) {
      return NextResponse.json({ message: "type은 lb 또는 hs여야 합니다." }, { status: 400 })
    }

    if (parsedRequest.data.type === "lb") {
      const data = await fetchBroadcast("lb")
      const response: BroadcastApiResponse = {
        type: "lb",
        list: data.list.slice(0, 10),
        mask: data.mask,
      }

      return NextResponse.json(response)
    }

    const data = await fetchBroadcast("hs")
    const response: BroadcastApiResponse = {
      type: "hs",
      list: data.list.slice(0, 10),
      mask: data.mask,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("방송 데이터 조회 실패:", error)
    return NextResponse.json({ message: "방송 데이터를 불러오지 못했습니다." }, { status: 500 })
  }
}
