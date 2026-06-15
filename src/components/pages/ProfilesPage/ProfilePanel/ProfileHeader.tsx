import { DecoratedHeading } from "@components/shared/DecoratedHeading"
import { Button } from "@components/shared/Button"
import { IconSVG } from "@components/shared/IconSVG"

interface ProfileHeaderProps {
  name: string
  buildsCount: number
  onClick: () => void
}

export const ProfileHeader = ({ name, buildsCount, onClick }: ProfileHeaderProps) => {
  return (
    <div className='absolute bottom-[calc(100%+10px)] w-full'>
      <DecoratedHeading text={name} gap={4} className="text-xl sm:text-2xl" />
      {buildsCount > 0 &&
        <div className='flex gap-2 center'>
          <p className='text-center text-neutral-500 text-xs sm:text-sm [text-decoration_underline]'>Builds: {buildsCount}</p>
          <Button className='text-center text-xs sm:text-sm rounded-sm bg-otz hover:bg-[hsl(from_var(--color-otz)_h_s_40%)] px-2 flex gap-1 items-center' onClick={onClick}>
            SHOW
            <IconSVG icon="Menu" size={1} />
          </Button>
        </div>
      }
    </div>
  )
}