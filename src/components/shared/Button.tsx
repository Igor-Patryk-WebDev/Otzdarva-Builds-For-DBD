import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode | string,
  className?: string
}

export default function Button({ children, className: classNames }: ButtonProps) {
  return <button className={`cursor-pointer ${classNames}`}>{children}</button>;
}