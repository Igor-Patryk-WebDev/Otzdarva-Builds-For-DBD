import type { ComponentPropsWithoutRef } from "react";
import type { IconName } from "@/utils/IconsData";
import { IconSVG } from "../shared/IconSVG";

type IconProps = {
  icon: IconName
} & ComponentPropsWithoutRef<"div">

export const Icon = ({ icon, className }: IconProps) => {
  const hasSizeClass = /\b(w-|h-|size-)\S+/.test(className ?? "");

  return (
    <div className={`${!hasSizeClass && "size-6"} ${className ?? ""}`} >
      <IconSVG icon={icon} />
    </div>
  )
}