import type { BroadcastTypeOption, BroadcastTypeToggleProps } from "@/lib/types/broadcast"

const broadcastTypes: BroadcastTypeOption[] = [
  { label: "라방", value: "lb" },
  { label: "홈쇼핑", value: "hs" },
]

export function BroadcastTypeToggle({ selectedType, onChange }: BroadcastTypeToggleProps) {
  return (
    <div className="flex gap-2" aria-label="방송 유형">
      {broadcastTypes.map((broadcastType) => {
        const isSelected = broadcastType.value === selectedType

        return (
          <button
            key={broadcastType.value}
            type="button"
            aria-pressed={isSelected}
            onClick={() => onChange(broadcastType.value)}
            className={`h-10 rounded-full border px-5 text-sm font-semibold transition-colors ${
              isSelected
                ? "border-[#f5a000] bg-[#fff7e8] text-[#101828]"
                : "border-[#e2e2e2] bg-white text-[#101828] hover:border-[#f5a000]"
            }`}
          >
            {broadcastType.label}
          </button>
        )
      })}
    </div>
  )
}
