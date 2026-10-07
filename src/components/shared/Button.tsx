import type { ComponentPropsWithoutRef } from "react";

type ButtonProps = {
  preset?: "otz"
} & ComponentPropsWithoutRef<"button">;

// const presets = {
//   default: "bg-otz hover:bg-otz-darker"
// }

export const Button = ({ children, preset, className, ...rest }: ButtonProps) => {
  return (
    <button className={`cursor-pointer`} {...rest}>
      {children}
    </button>
  );
};
