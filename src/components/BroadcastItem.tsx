import Image from "next/image"

import { getShortBroadcastDate } from "@/lib/client/broadcast"
import type { BroadcastItemProps, BroadcastMetricValueProps } from "@/lib/types/broadcast"

function BroadcastMetricValue({ metric, isMasked, showLoginText = false, showPreparing = false }: BroadcastMetricValueProps) {
  if (showPreparing) {
    return <Image src="/assets/preparing.svg" alt="집계 준비 중" width={12} height={14} />
  }

  if (isMasked) {
    return (
      <span className="inline-flex items-center justify-center gap-1">
        <Image src="/assets/locked.svg" alt="로그인 필요" width={14} height={14} />
        {showLoginText && <span>로그인</span>}
      </span>
    )
  }

  if (metric.value === null) {
    return <Image src="/assets/preparing.svg" alt="집계 준비 중" width={12} height={14} />
  }

  return <>{metric.value.toLocaleString("ko-KR")}</>
}

export function BroadcastTableRow({ item, isMasked }: BroadcastItemProps) {
  return (
    <tr className="border-b border-[#e9e9e9] text-sm">
      <td className="py-2 text-center font-semibold text-[#f5a000]">{item.rank}</td>
      <td className="max-w-0 py-2 pr-4">
        <strong className="block truncate font-semibold text-[#101828]">{item.title}</strong>
        <span className="mt-0.5 block text-xs text-[#888888]">{item.platformName}</span>
      </td>
      <td className="truncate py-2 text-center text-[#4b5563]">{item.categoryName}</td>
      <td className="whitespace-nowrap py-2 text-center text-[#4b5563]">
        <div>{item.broadcastDate}</div>
        <div>{item.broadcastTime}</div>
      </td>
      {item.metrics.map((metric) => (
        <td key={metric.key} className="py-2 text-center text-[#101828]">
          <BroadcastMetricValue metric={metric} isMasked={isMasked} showLoginText />
        </td>
      ))}
      <td className="py-2 text-center text-[#101828]">{item.productCount}</td>
    </tr>
  )
}

export function BroadcastMobileItem({ item, isMasked, isHomeshopping = false }: BroadcastItemProps) {
  return (
    <li className="grid grid-cols-[24px_minmax(0,1fr)] gap-3 border-b border-[#e9e9e9] py-4">
      <span className="pt-4 text-right text-sm font-semibold text-[#f5a000]">{item.rank}</span>
      <div className="min-w-0">
        <div className="flex min-w-0 items-baseline gap-2">
          <span className="shrink-0 text-xs text-[#888888]">{item.platformName}</span>
          <strong className="truncate text-sm font-semibold text-[#101828]">{item.title}</strong>
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-[#4b5563]">
          <span className="text-[#101828]">{getShortBroadcastDate(item.broadcastDate)}</span>
          {item.metrics.map((metric) => (
            <span key={metric.key} className="inline-flex items-center gap-1">
              {metric.label}
              <BroadcastMetricValue
                metric={metric}
                isMasked={isMasked}
                showPreparing={isHomeshopping && metric.key === "audienceRating"}
              />
            </span>
          ))}
          <span>상품수 {item.productCount}</span>
        </div>
      </div>
    </li>
  )
}
