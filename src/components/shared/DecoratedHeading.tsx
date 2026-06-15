interface DecoratedHeadingProps {
  text: string
  gap?: number
  className?: string
}

export const DecoratedHeading = ({ text, gap = 4, className }: DecoratedHeadingProps) => {
  const gapClass = `gap-${gap}`;

  return (
    <div className={`grid grid-cols-[1fr_auto_1fr] ${gapClass} items-center mb-1 sm:mb-2`}>
      <div className='h-px bg-linear-to-l from-otz to-transparent'></div>
      <p className={`${className} font-bold text-center`}>{text}</p>
      <div className='h-px bg-linear-to-r from-otz to-transparent'></div>
    </div>
  )
}