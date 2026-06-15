import { IconsData, type IconName } from "@utils/IconsData";

type IconSVGProps = {
  icon: IconName
  size?: number
  className?: string
};

export const IconSVG = ({ icon, size = 2, className }: IconSVGProps) => {
  const IconData = IconsData[icon];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`${className || ''} text-red transition-colors`}
      style={{ width: `${size}rem`, height: `${size}rem` }}
    >
      <path d={IconData.svg}></path>
    </svg>
  );
};
