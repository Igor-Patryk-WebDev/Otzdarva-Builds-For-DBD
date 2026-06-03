import { createFileRoute } from "@tanstack/react-router";
import { useCharactersFromBuilds } from "@hooks/builds/useCharactersFromBuilds";
import { useScrape } from "@contexts/AppDataContext";
import { useBuildProfiles } from "@hooks/useBuildProfiles";

export const Route = createFileRoute("/buildCreator")({
  component: RouteComponent,
});
// const { data: buildData, isLoading } = useBuilds();

function RouteComponent() {
  const { profiles: killersProfiles } = useBuildProfiles({ role: "Killers" });
  const { profiles: survivorsProfiles } = useBuildProfiles({
    role: "Survivors",
  });

  return (
    <div className="flex flex-col px-4">
      <h1 className="text-9xl">Build Creator</h1>
      <div className="grid grid-cols-1">
        {killersProfiles.map((character) => {
          console.log(character);
          return (
            <div key={character.name} className="flex w-full">
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
                  src={
                    character.portraitUrl ?? "/images/Unknown_Character.webp"
                  }
                  alt={character.name}
                  className="absolute inset-0 w-full h-full z-20"
                />
              </div>
              <div className="flex gap-4 h-64 bg-neutral-800">
                {character.builds.map((build) => {
                  console.log(build);
                  return (
                    <div
                      key={character.name + build.name}
                      className="flex flex-col"
                    >
                      <h3 className="text-4xl">{build.name}</h3>
                      {build.perks.map((perk) => (
                        <div className="flex">
                          <img
                            key={perk.name}
                            src={perk.name}
                            alt={perk.name}
                          />
                        </div>
                      ))}
                      <p>{build.notes}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
        {survivorsProfiles.map((character) => (
          <div key={character.name} className="flex w-full">
            <div className="relative h-64 aspect-square">
              <img
                src="/images/CharPortrait_bg.webp"
                alt="bg"
                className="absolute inset-0 w-full h-full object-contain z-0"
              />
              <img
                src="/images/CharPortrait_roleBG.webp"
                alt="role bg"
                className="absolute inset-0 w-full h-full object-contain z-10"
              />
              <img
                src={character.portraitUrl ?? "/images/Unknown_Character.webp"}
                alt={character.name}
                className="absolute inset-0 w-full h-full object-cover z-20"
              />
            </div>
            <div className="flex h-64 bg-neutral-800">
              {character.builds.map((build) => {
                console.log(build);
                return (
                  <div key={build.name} className="flex flex-col">
                    <h3 className="text-4xl">{build.name}</h3>
                    {build.perks.map((perk) => (
                      <div className="flex">
                        <img key={perk.name} src={perk.name} alt={perk.name} />
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
