
type BuildExpandedViewDescriptionProps = {
  notes: string[]
}

export const BuildExpandedViewDescription = ({ notes }: BuildExpandedViewDescriptionProps) => {
  return (
    <div className="border-t border-neutral-800 py-8">
      <h2 className="font-bold text-2xl mb-4">Build description:</h2>
      <ol className="flex flex-col gap-1 list-decimal text-xs sm:text-sm text-otz text-left">
        {notes.map((note, i) => (
          <li key={`expanded-build-note-${i}`} className='ml-4 marker:font-bold'><p className='text-neutral-300'>{note}</p></li>
        ))}
      </ol>
    </div>
  )
}