interface DecoratedHeadingProps {
  text: string
  gap?: number
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl"
}

export const DecoratedHeading = ({ text, gap = 4, size = "md" }: DecoratedHeadingProps) => {
  const gapClass = `gap-${gap}`
  const textClass = `text-${size}`;
  return (
    <div className={`grid grid-cols-[1fr_auto_1fr] ${gapClass} items-center mb-1`}>
      <div className='h-px bg-linear-to-l from-otz to-transparent'></div>
      <p className={`${textClass} font-bold text-center`}>{text}</p>
      <div className='h-px bg-linear-to-r from-otz to-transparent'></div>
    </div>
  )
}