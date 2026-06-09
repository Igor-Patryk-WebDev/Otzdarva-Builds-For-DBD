import { AdminNavigation } from "@components/pages/BuildCreator/AdminNavigation";
import { CharacterPortrait } from "@components/pages/BuildCreator/CharacterPortrait";
import { CharacterBuilds } from "@components/pages/BuildCreator/CharacterBuilds";
import { useProfiles } from "@contexts/AppDataContext";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/buildCreator")({
  beforeLoad: async () => {
    const res = await fetch("/api/session.php");
    if (!res.ok) throw redirect({ to: "/login" });
  },
  component: RouteComponent,
});

function RouteComponent() {
  const profiles = useProfiles();

  const killerProfiles = profiles.killers;
  const survivorProfiles = profiles.survivors;

  return (
    <section className="px-4 overflow-y-clip">
      <AdminNavigation />
      <div className="grid grid-cols-1 gap-4">
        {killerProfiles.map((character) => (
          <div key={character.name} className="flex w-full">
            <CharacterPortrait character={character} />
            <CharacterBuilds character={character} />
          </div>
        ))}
        {survivorProfiles.map((character) => (
          <div key={character.name} className="flex w-full">
            <CharacterPortrait character={character} />
            <CharacterBuilds character={character} />
          </div>
        ))}
      </div>
    </section>
  );
}
