import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode | string;
  className?: string;
  color: "otz" | "grey";
  onClick?: () => void;
};

export const Button = ({
  children,
  className: classNames,
  color,
  onClick,
}: ButtonProps) => {
  const styles = {
    otz: "bg-otz hover:bg-otzHover transition-colors",
    grey: "bg-neutral-700 hover:bg-neutral-600 transition-colors",
  };

  return (
    <button
      onClick={onClick}
      className={`${classNames} cursor-pointer ${styles[color]} rounded-md px-4 py-2`}
    >
      {children}
    </button>
  );
};
