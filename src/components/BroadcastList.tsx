import { BroadcastMobileItem, BroadcastTableRow } from "./BroadcastItem"
import type { BroadcastListProps } from "@/lib/types/broadcast"

export function BroadcastList({ items, type, isMasked }: BroadcastListProps) {
  const firstMetricLabel = items[0]?.metrics[0]?.label ?? "조회수"

  return (
    <div>
      <div className="hidden md:block">
        <table className="w-full table-fixed border-collapse">
          <thead className="border-b border-[#9b9b9b] text-xs font-medium text-[#6b7280]">
            <tr>
              <th className="w-[5%] py-3" aria-label="순위" />
              <th className="w-[33%] py-3 text-center">방송정보</th>
              <th className="w-[13%] py-3 text-center">분류</th>
              <th className="w-[14%] py-3 text-center">방송시간</th>
              <th className="w-[9%] py-3 text-center">{firstMetricLabel}</th>
              <th className="w-[9%] py-3 text-center">판매량</th>
              <th className="w-[9%] py-3 text-center">매출액</th>
              <th className="w-[8%] py-3 text-center">상품수</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <BroadcastTableRow key={item.id} item={item} isMasked={isMasked} />
            ))}
          </tbody>
        </table>
      </div>

      <ol className="md:hidden">
        {items.map((item) => (
          <BroadcastMobileItem key={item.id} item={item} isMasked={isMasked} isHomeshopping={type === "hs"} />
        ))}
      </ol>
    </div>
  )
}
