import { killerUniversal } from "../../../data/variables";

type Props = {};

export default function CharacterBox({}: Props) {
  return (
    <div className="w-2/5">
      <div className="relative h-200">
        <p>Universal Builds</p>
        <div className="">
          <img
            src="/Images/CharPortrait_bg.webp"
            alt="bg"
            className="absolute inset-0 w-full h-full object-contain"
          />
          <img
            src="/Images/CharPortrait_roleBG.webp"
            alt="rolebg"
            className="absolute inset-0 w-full h-full object-contain"
          />
          <img
            src={killerUniversal}
            alt="ALT"
            className="absolute inset-0 w-full h-full object-contain z-100"
          />
        </div>
      </div>
    </div>
  );
}
