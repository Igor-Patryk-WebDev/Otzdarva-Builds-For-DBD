interface CharacterPortraitBlockProps {
  name: string,
  portraitUrl: string
}

export const CharacterPortraitBlock = ({ name, portraitUrl }: CharacterPortraitBlockProps) => {
  return (
    <div>
      <h3>{name}</h3>
      <img src={portraitUrl} alt={`${name} Portrait`} />
    </div>
  )
}