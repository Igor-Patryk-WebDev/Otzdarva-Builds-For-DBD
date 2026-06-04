interface BuildNotesBlockProps {
  notes: string[]
}

export const BuildNotesBlock = ({ notes }: BuildNotesBlockProps) => {
  return (
    <div>
      {
        notes.length != 0
          ? notes.map((note) => (
            <p>{note}</p>
          ))
          : <p>Notes not included, sorry!</p>
      }
    </div>
  )
}