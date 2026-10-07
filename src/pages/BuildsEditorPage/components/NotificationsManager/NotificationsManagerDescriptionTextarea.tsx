import type { Dispatch, SetStateAction } from "react"

type NotificationsManagerDescriptionTextareaProps = {
  value: string
  setter: Dispatch<SetStateAction<string>>
}

export const NotificationsManagerDescriptionTextarea = ({ value, setter }: NotificationsManagerDescriptionTextareaProps) => {
  return (
    <div>
      <label className="text-sm font-semibold text-neutral-300">
        Description
      </label>
      <textarea
        rows={3}
        placeholder="Enter the announcement message..."
        className="w-full bg-neutral-950/40 border border-neutral-800 rounded-lg px-3.5 py-2.5 mt-2 text-sm text-neutral-400 placeholder:text-neutral-600 focus:border-otz focus:outline-none transition resize-none"
        value={value}
        onChange={(e) => setter(e.target.value)}
      />
    </div>
  )
}