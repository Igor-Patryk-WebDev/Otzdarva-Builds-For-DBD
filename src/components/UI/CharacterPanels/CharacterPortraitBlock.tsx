export const CharacterPortraitBlock = ({ name, imgUrl }) => {
  return (
    <div>
      <h3>{name}</h3>
      <img src={imgUrl} alt={`${name} Portrait`} />
    </div>
  )
}