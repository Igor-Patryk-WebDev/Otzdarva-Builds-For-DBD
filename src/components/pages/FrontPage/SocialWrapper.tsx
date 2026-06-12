import { SVG } from "./icons";

export const SocialWrapper = () => {
  return (
    <div className="w-fit flex gap-4">
      <SVG icon="Discord" classname="hover:text-[#5865F2]" />
      <SVG icon="Youtube" classname="hover:text-[#FF0033]" />
      <SVG icon="X" classname="hover:text-[#797979]" />
      <SVG icon="Twitch" classname="hover:text-[#9146FF]" />
    </div>
  );
};
