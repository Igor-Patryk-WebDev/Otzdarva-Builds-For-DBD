import { type ComponentPropsWithoutRef, type PropsWithChildren } from 'react'

export const Keybind = ({ children, className, ...rest }: PropsWithChildren<ComponentPropsWithoutRef<"button">>) => {
  return (
    <button className={className ?? ""} {...rest}>
      <kbd className='block bg-neutral-800 px-2 rounded-sm border-2 border-neutral-700 shadow-[0_6px_0] shadow-neutral-800 hover:shadow-[0_0_0] translate-y-0 hover:translate-y-1.5 transition-all cursor-pointer'>
        {children}
      </kbd>
    </button>
  )
}