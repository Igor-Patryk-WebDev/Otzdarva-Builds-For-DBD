import type { ProfileData } from "@appTypes/Profiles";

interface Props {
  character: ProfileData;
}

export function CharacterPortrait({ character }: Props) {
  const styles = {
    killers: {
      filter: "killers-filter"
    },
    survivors: {
      filter: "survivors-filter"
    }
  }
  return (
    <div className="flex flex-col">
      <div className="relative h-64 aspect-square">
        <img
          src="/images/CharPortrait_bg.webp"
          alt="bg"
          className="absolute inset-0 w-full h-full z-0"
        />
        <img
          src="/images/CharPortrait_roleBG.webp"
          alt="role bg"
          className={`absolute inset-0 w-full h-full ${styles[character.role].filter} z-1`}
        />
        <img
          src={character.portraitUrl ?? "/images/Unknown_Character.webp"}
          alt={character.name}
          className="absolute inset-0 w-full h-full z-2"
        />
      </div>
    </div>
  );
}
