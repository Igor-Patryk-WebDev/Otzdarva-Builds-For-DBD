import type { ComponentPropsWithoutRef, ReactNode } from "react";

type ButtonProps = {
  children: ReactNode | string;
  preset?: "otz"
} & ComponentPropsWithoutRef<"button">;

const presets = {
  otz: "bg-otz hover:bg-otz-darker"
}

export const Button = ({ children, preset, className, ...rest }: ButtonProps) => {
  return (
    <button className={`cursor-pointer transition-all active:scale-95 ${preset && presets[preset]} ${className}`} {...rest}>
      {children}
    </button>
  );
};
