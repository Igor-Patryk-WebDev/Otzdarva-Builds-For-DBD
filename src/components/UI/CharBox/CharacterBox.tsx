import { killerList } from "../../../data/variables"


type Props = {};

export default function CharacterBox({ }: Props) {
    return (
        <div className="w-2/5">
            {killerList.map(([name, info]) => (
                <div key={name} className="relative h-200">
                    <p>The {name}</p>
                    <div className="">
                        <img src="/Images/CharPortrait_bg.webp" alt="bg" className="absolute inset-0 w-full h-full object-cover" />
                        <img src="/Images/CharPortrait_roleBG.webp" alt="rolebg" className="absolute inset-0 w-full h-full object-cover" />
                        <img src={info.portrait} alt={name} className="absolute inset-0 w-full h-full object-contain z-100" />
                    </div>
                </div>
            ))}
        </div>
    );
}