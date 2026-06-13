import type { ComponentPropsWithoutRef, ReactNode } from "react";

type ButtonProps = {
  children: ReactNode | string;
} & ComponentPropsWithoutRef<"button">

export const Button = ({ children, className, ...rest }: ButtonProps) => {
  return (
    <button className={`cursor-pointer ${className}`} {...rest}>
      {children}
    </button>
  );
};
