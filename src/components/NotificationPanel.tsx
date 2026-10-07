import type { Alert } from "@/types/announcements.types"
import { formattedTimeFromAlert } from "@/utils/formattedTimeFromAlert"
import { THREAT_LEVEL_CONFIG } from "@/utils/threatLevelConfig"

type NotificationPanelProps = {
  alert: Alert
}

export const NotificationPanel = ({ alert }: NotificationPanelProps) => {
  const formattedTime = formattedTimeFromAlert(alert);
  const config =
    THREAT_LEVEL_CONFIG.find((c) =>
      c.level === alert.threatLevel
    ) || THREAT_LEVEL_CONFIG[0];

  return (
    <div key={alert.id} className={`px-4 py-2 bg-neutral-900 border border-l-4 rounded-lg border-neutral-800 ${config.borderClass}`}>
      <div className="mb-1">
        <span
          className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${config.badgeClass}`}
        >
          {config.name}
        </span>
      </div>
      <div>
        <p className="text-base text-neutral-300 leading-relaxed font-bold">{alert.title}</p>
        <p className="text-xs text-neutral-400 leading-relaxed mb-1">{alert.desc}</p>
      </div>
      <div className="flex items-center justify-between mt-3 pt-2 border-t border-neutral-800/60 text-[10px] text-neutral-500">
        <span>
          {new Date(alert.createdAt).toLocaleDateString()}
        </span>
        <span className="text-neutral-400">
          {formattedTime ?? "No expiry"}
        </span>
      </div>
    </div>
  )
}