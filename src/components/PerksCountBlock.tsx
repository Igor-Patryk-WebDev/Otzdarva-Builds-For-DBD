
type PerksCountBlockProps = {
  count: number
}

export const PerksCountBlock = ({ count }: PerksCountBlockProps) => {
  return (
    <div className="absolute pointer-events-none top-1.5 sm:top-2.5 right-1.5 sm:right-2.5 translate-x-1/2 -translate-y-1/2 flex center size-7 sm:size-9 aspect-square bg-[url(/images/perk-background-red.png)] bg-contain">
      <p className="text-xs sm:text-sm">
        {`+${count}`}
      </p>
    </div>
  )
}