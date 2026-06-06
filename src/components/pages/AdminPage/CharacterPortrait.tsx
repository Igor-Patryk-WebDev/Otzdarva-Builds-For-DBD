import { Button } from "@components/shared/Button";

export const CharacterPortrait = () => {
  const killerProfiles: any[] = [];

  if (!killerProfiles || killerProfiles.length === 0) return null;

  return killerProfiles.map((character: any) => {
    console.log(character);
    return (
      <div key={character.name} className="flex w-full">
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
              className="absolute inset-0 w-full h-full z-10"
            />
            <img
              src={character.portraitUrl ?? "/images/Unknown_Character.webp"}
              alt={character.name}
              className="absolute inset-0 w-full h-full z-20"
            />
            <Button
              color="otz"
              className="absolute bottom-0 z-30 right-[50%] translate-x-[50%]"
            >
              Add Build
            </Button>
          </div>
        </div>
      </div>
    );
  });
};
