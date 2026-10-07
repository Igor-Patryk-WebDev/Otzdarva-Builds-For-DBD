type BuildNotesBlockProps = {
  notes: string[]
}

export const BuildNotesBlock = ({ notes }: BuildNotesBlockProps) => {
  return (
    <div className='h-36 overflow-y-auto scrollbar-thin scrollbar-thumb-otz'>
      {notes.length != 0
        ? <ol className='flex flex-col gap-1 list-decimal text-xs sm:text-sm text-otz text-left py-2'>
          {notes.map((note) => (
            <li key={note} className='ml-5 sm:ml-6 marker:font-bold'><p className='text-neutral-300'>{note}</p></li>
          ))}
        </ol>
        : <div className="flex center h-full">
          <p className='text-xs sm:text-sm font-bold text-neutral-300 -rotate-3'>Notes not included, sorry!</p>
        </div>
      }
    </div>
  )
}