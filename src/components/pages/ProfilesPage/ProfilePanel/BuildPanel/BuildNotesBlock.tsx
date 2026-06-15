interface BuildNotesBlockProps {
  notes: string[]
}

export const BuildNotesBlock = ({ notes }: BuildNotesBlockProps) => {
  return (
    <div className='h-36 overflow-y-auto scrollbar-thin scrollbar-thumb-otz'>
      <ol className='flex flex-col gap-1 list-decimal text-xs sm:text-sm text-otz py-2'>
        {
          notes.length != 0
            ? notes.map((note) => (
              <li className='ml-6 marker:font-bold'><p className='text-neutral-300'>{note}</p></li>
            ))
            : <p className='text-neutral-300'>Notes not included, sorry!</p>
        }
      </ol>
    </div>
  )
}