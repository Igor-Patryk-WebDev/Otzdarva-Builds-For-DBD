import type { Dispatch, SetStateAction } from "react"

type NotificationsManagerTitleInputProps = {
  value: string
  setter: Dispatch<SetStateAction<string>>
}

export const NotificationsManagerTitleInput = ({ value, setter }: NotificationsManagerTitleInputProps) => {
  return (
    <div>
      <label className="text-sm font-semibold text-neutral-300">
        Title
      </label>
      <input
        className="w-full bg-neutral-950/40 border border-neutral-800 rounded-lg px-3.5 py-2.5 mt-2 text-sm text-neutral-400 placeholder:text-neutral-600 focus:border-otz focus:outline-none transition"
        type="text"
        placeholder="e.g. New Trapper builds"
        value={value}
        onChange={(e) => setter(e.target.value)}
      />
    </div>
  )
}