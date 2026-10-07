
type BuildsEditorHeadingProps = {
  name: string
}

export const BuildsEditorHeading = ({ name }: BuildsEditorHeadingProps) => {
  return (
    <div className="flex items-center justify-center bg-neutral-800 rounded-lg p-4 border border-white/10">
      <h2 className="font-bold text-3xl text-white text-center">{name}</h2>
    </div>
  )
}