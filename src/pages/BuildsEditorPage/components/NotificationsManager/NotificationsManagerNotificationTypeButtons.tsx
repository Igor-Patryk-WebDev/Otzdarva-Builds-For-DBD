import type { Dispatch, SetStateAction } from "react";
import { THREAT_LEVEL_CONFIG } from "@/utils/threatLevelConfig";
import { Icon } from "@/components/shared/Icon";

type NotificationsManagerNotificationTypeButtonsProps = {
  threatLevel: number
  setThreatLevel: Dispatch<SetStateAction<number>>
}

export const NotificationsManagerNotificationTypeButtons = ({ threatLevel, setThreatLevel }: NotificationsManagerNotificationTypeButtonsProps) => {
  return (
    <div>
      <label className="text-sm font-semibold text-neutral-300">
        Announcement Level
      </label>
      <div className="grid grid-cols-3 gap-2 mt-2">
        {THREAT_LEVEL_CONFIG.map((cfg) => {
          const isSelected = threatLevel === cfg.level;
          return (
            <button
              key={cfg.level}
              type="button"
              onClick={() => setThreatLevel(cfg.level)}
              className={`p-2.5 rounded-lg border text-left flex flex-col gap-1 transition-all cursor-pointer ${isSelected
                ? `${cfg.badgeClass}`
                : "bg-neutral-950/40 border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200"
                }`}
            >
              <div className="flex items-center gap-1.5 font-medium text-xs">
                <Icon icon={cfg.icon} className="size-5" />
                <span>{cfg.name}</span>
              </div>
              <span className="text-[10px] opacity-70 leading-tight">
                {cfg.desc}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  )
}