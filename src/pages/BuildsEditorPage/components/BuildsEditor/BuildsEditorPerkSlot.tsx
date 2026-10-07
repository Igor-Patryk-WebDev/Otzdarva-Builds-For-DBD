
type BuildsEditorPerkSlotProps = {
  index: number
}

export const BuildsEditorPerkSlot = ({ index }: BuildsEditorPerkSlotProps) => {
  return (
    <button className="cursor-pointer rounded-lg hover:bg-neutral-700/50">
      <img src="/images/no_perk.png" alt={`${index}`} />
    </button>
  )
}