import { DecoratedHeading } from "@components/shared/DecoratedHeading"
import { Button } from "@components/shared/Button"

interface ProfileHeaderProps {
  name: string
  buildsCount: number
  onClick: () => void
}

export const ProfileHeader = ({ name, buildsCount, onClick }: ProfileHeaderProps) => {
  return (
    <div className='absolute bottom-[calc(100%+10px)] w-full'>
      <DecoratedHeading text={name} gap={4} size="2xl" />
      {buildsCount > 0 &&
        <div className='flex gap-2 center'>
          <p className='text-center text-neutral-500 text-sm [text-decoration_underline]'>Builds: {buildsCount}</p>
          <Button className='text-center text-sm rounded-sm bg-otz px-2' onClick={onClick}>
            SHOW
          </Button>
        </div>
      }
    </div>
  )
}