import { RoleSelectButton } from "./RoleSelectButton"

export const RoleSelectWrapper = () => {
  return (
    <div className='flex w-185 max-w-full flex-col gap-2'>
      <RoleSelectButton variant="Killers" />
      <RoleSelectButton variant="Survivors" />
    </div>
  )
}