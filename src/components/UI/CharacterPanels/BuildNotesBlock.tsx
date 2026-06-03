interface BuildNotesBlockProps {
  notes: string[]
}

export const BuildNotesBlock = ({ notes }: BuildNotesBlockProps) => {
  return (
    <div>
      {notes.map((note) => (
        <p>{note}</p>
      ))}
    </div>
  )
}