import type { Dispatch, SetStateAction } from "react"

type NotificationsManagerNotificationTimerInputsProps = {
  days: number
  setDays: Dispatch<SetStateAction<number>>
  hours: number
  setHours: Dispatch<SetStateAction<number>>
  minutes: number
  setMinutes: Dispatch<SetStateAction<number>>
  seconds: number
  setSeconds: Dispatch<SetStateAction<number>>
}

export const NotificationsManagerNotificationTimerInputs = ({
  days,
  setDays,
  hours,
  setHours,
  minutes,
  setMinutes,
  seconds,
  setSeconds
}: NotificationsManagerNotificationTimerInputsProps) => {
  return (
    <div>
      <div className="flex items-end gap-2">
        <label className="text-sm font-semibold text-neutral-300">
          Auto-Delete Timer
        </label>
        <span className="text-[10px] text-neutral-500">(Optional)</span>
      </div>
      <div className="grid grid-cols-4 gap-2 mt-2">
        {[
          {
            label: "Days",
            val: days,
            set: setDays,
            max: 365,
            placeholder: "0",
          },
          {
            label: "Hours",
            val: hours,
            set: setHours,
            max: 23,
            placeholder: "0",
          },
          {
            label: "Mins",
            val: minutes,
            set: setMinutes,
            max: 59,
            placeholder: "0",
          },
          {
            label: "Secs",
            val: seconds,
            set: setSeconds,
            max: 59,
            placeholder: "0",
          },
        ].map((item) => (
          <div key={item.label} className="space-y-1">
            <input
              type="number"
              min={0}
              max={item.max}
              value={item.val || ""}
              placeholder={item.placeholder}
              onChange={(e) => item.set(Number(e.target.value) || 0)}
              className="w-full bg-neutral-950/40 border border-neutral-800 rounded-lg px-2 py-2 text-center text-sm font-mono text-neutral-400 placeholder:text-neutral-600 focus:border-otz focus:outline-none transition"
            />
            <span className="block text-center text-[10px] text-neutral-400 font-medium">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}