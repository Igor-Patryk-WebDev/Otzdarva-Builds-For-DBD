import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode | string,
  className?: string
}

export const Button = ({ children, className: classNames }: ButtonProps) => {
  return <button className={`${classNames} cursor-pointer bg-otz rounded-md px-4 py-2`}>{children}</button>;
}