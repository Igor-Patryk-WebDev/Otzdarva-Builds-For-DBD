interface ProfileHeaderProps {
  name: string
  buildsCount: number
  onClick: () => void
}

export const ProfileHeader = ({ name, buildsCount, onClick }: ProfileHeaderProps) => {
  return (
    <div className='absolute bottom-[calc(100%+10px)] w-full -z-1'>
      <div className='grid grid-cols-[1fr_auto_1fr] gap-4 items-center mb-1'>
        <div className='h-px bg-linear-to-l from-otz to-transparent'></div>
        <h3 className='text-2xl font-bold text-center z-2'>{name}</h3>
        <div className='h-px bg-linear-to-r from-otz to-transparent'></div>
      </div>
      {buildsCount > 0 &&
        <div className='flex gap-2 center'>
          <p className='text-center text-neutral-500 text-sm [text-decoration_underline]'>Builds: {buildsCount}</p>
          <button className='text-center text-sm cursor-pointer bg-otz rounded-sm px-2' onClick={onClick}>
            SHOW
          </button>
        </div>
      }
    </div>
  )
}