import type { ComponentPropsWithoutRef } from "react";

type DecoratedHeadingProps = {
  text: string
} & ComponentPropsWithoutRef<"div">

export const DecoratedHeading = ({ text, className }: DecoratedHeadingProps) => {
  return (
    <div className={`grid grid-cols-[1fr_auto_1fr] gap-2 sm:gap-4 items-center mb-1`}>
      <div className='h-px bg-linear-to-l from-otz to-transparent'></div>
      <p className={`${className} font-bold text-center`}>{text}</p>
      <div className='h-px bg-linear-to-r from-otz to-transparent'></div>
    </div>
  )
}