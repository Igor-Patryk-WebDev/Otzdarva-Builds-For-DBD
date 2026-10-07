import { IconsData, type IconName } from "@/utils/IconsData";
import type { ComponentPropsWithoutRef } from "react";

type IconSVGProps = {
  icon: IconName
} & ComponentPropsWithoutRef<"svg">;

export const IconSVG = ({ icon, className }: IconSVGProps) => {
  const IconData = IconsData[icon];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`${className} w-full h-full text-red transition-colors`}
    >
      <path d={IconData.svg}></path>
    </svg>
  );
};
