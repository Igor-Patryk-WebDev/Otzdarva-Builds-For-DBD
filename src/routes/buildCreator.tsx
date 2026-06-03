import { createFileRoute } from "@tanstack/react-router";
import { useScrapeJSON } from "@hooks/queries/useScrapeJSON";
import { useCharactersFromBuilds } from "@hooks/builds/useCharactersFromBuilds";

export const Route = createFileRoute("/buildCreator")({
  component: RouteComponent,
});
// const { data: buildData, isLoading } = useBuilds();

function RouteComponent() {
  const { data: wikiData, isLoading: wikiLoading } = useScrapeJSON();
  const { characters: killersList, isLoading: killersLoading } =
    useCharactersFromBuilds({ role: "killers" });
  const { characters: survivorsList, isLoading: survivorsLoading } =
    useCharactersFromBuilds({ role: "survivors" });

  const isLoading = wikiLoading || killersLoading || survivorsLoading;

  if (isLoading || !wikiData) return null;

  const wikiKillers = wikiData.characters.killers;
  const wikiSurvivors = wikiData.characters.survivors;

  return (
    <div className="flex flex-col px-4">
      <h1 className="text-9xl">Build Creator</h1>
      <div className="grid grid-cols-1">
        {killersList.map(([name]) => (
          <div key={name} className="flex w-full">
            <div className="relative w-1/4 h-64">
              <img
                src="/Images/CharPortrait_bg.webp"
                alt="bg"
                className="absolute inset-0 w-full h-full z-0"
              />
              <img
                src="/Images/CharPortrait_roleBG.webp"
                alt="role bg"
                className="absolute inset-0 w-full h-full z-10"
              />
              <img
                src={
                  wikiKillers[name]?.portrait ??
                  "/Images/Unknown_Character.webp"
                }
                alt={name}
                className="absolute inset-0 w-full h-full z-20"
              />
            </div>
          </div>
        ))}
        {survivorsList.map(([name]) => (
          <div key={name} className="flex w-full">
            <div className="relative h-64 aspect-square">
              <img
                src="/Images/CharPortrait_bg.webp"
                alt="bg"
                className="absolute inset-0 w-full h-full object-contain z-0"
              />
              <img
                src="/Images/CharPortrait_roleBG.webp"
                alt="role bg"
                className="absolute inset-0 w-full h-full object-contain z-10"
              />
              <img
                src={
                  wikiSurvivors[name]?.portrait ??
                  "/Images/Unknown_Character.webp"
                }
                alt={name}
                className="absolute inset-0 w-full h-full object-cover z-20"
              />
            </div>
            <div className="h-64 w-3/4"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
