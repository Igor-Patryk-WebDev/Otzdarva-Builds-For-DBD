import { BackToFrontPageButton } from "./BackToFrontPageButton"
import { ChangeRolePageButton } from "./ChangeRolePageButton"

export const Navigation = () => {
  return (
    <div className='fixed bottom-4 sm:bottom-auto shadow sm:shadow-none shadow-black border sm:border-none border-neutral-800 right-1/2 translate-x-1/2 sm:translate-x-0 bg-neutral-900 sm:bg-transparent px-4 py-3 sm:p-0 rounded-md sm:top-4 sm:right-4 flex gap-4 z-5'>
      <ChangeRolePageButton />
      <BackToFrontPageButton />
    </div>
  )
}