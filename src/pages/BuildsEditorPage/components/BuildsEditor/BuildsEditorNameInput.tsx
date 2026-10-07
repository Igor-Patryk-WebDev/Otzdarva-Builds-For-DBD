
type BuildsEditorNameInputProps = {
  name: string | undefined
}

export const BuildsEditorNameInput = ({ name }: BuildsEditorNameInputProps) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs text-neutral-400 uppercase tracking-widest pl-1">
        Build Name
      </label>
      <input
        className="bg-neutral-800 border border-white/10 rounded-lg px-4 py-2 text-white placeholder:text-neutral-500 focus:outline-none focus:border-otz resize-none"
        type="text"
        value={name}
        placeholder="Enter build name..."
        onChange={() => console.log("setBuildName")}
      />
    </div>
  )
}