import { BackToFrontPageButton } from "./BackToFrontPageButton"
import { ChangeRolePageButton } from "./ChangeRolePageButton"

export const Navigation = () => {
  return (
    <div className='absolute top-0 right-4 bg-amber-400'>
      <ChangeRolePageButton />
      <BackToFrontPageButton />
    </div>
  )
}