"use client"

import { useQuery } from "@tanstack/react-query"
import { useState } from "react"

import { BroadcastList } from "@/components/BroadcastList"
import { BroadcastTypeToggle } from "@/components/BroadcastTypeToggle"
import { fetchBroadcastList } from "@/lib/client/fetch-broadcast"
import type { BroadcastType } from "@/lib/types/broadcast"

export default function Home() {
  const [selectedType, setSelectedType] = useState<BroadcastType>("lb")
  const {
    data: broadcastData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["broadcast", selectedType],
    queryFn: () => fetchBroadcastList(selectedType),
  })

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-250 flex-col px-9 py-12 md:px-0 md:py-16">
      <header className="border-b-2 border-[#222222] pb-3 text-lg font-semibold text-[#101828]">🟡 라방 · 홈쇼핑 랭킹 (채용 과제)</header>

      <section className="mt-12" aria-label="방송 목록">
        <BroadcastTypeToggle selectedType={selectedType} onChange={setSelectedType} />
        <div className="mt-5 border-t border-[#e9e9e9]">
          {isError && <p className="py-8 text-sm text-red-600">방송 목록을 불러오지 못했습니다.</p>}
          {isLoading && <p className="py-8 text-sm text-[#6b7280]">목록을 불러오는 중입니다.</p>}
          {broadcastData && <BroadcastList items={broadcastData.list} type={broadcastData.type} isMasked={broadcastData.mask} />}
        </div>
      </section>
    </main>
  )
}
