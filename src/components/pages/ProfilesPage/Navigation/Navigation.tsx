import { BackToFrontPageButton } from "./BackToFrontPageButton"
import { ChangeRolePageButton } from "./ChangeRolePageButton"

export const Navigation = () => {
  return (
    <div className='absolute top-4 right-4 flex gap-4'>
      <ChangeRolePageButton />
      <BackToFrontPageButton />
    </div>
  )
}