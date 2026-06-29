import type { DbdRole } from "@appTypes/DbdRole";

import { createFileRoute, redirect } from "@tanstack/react-router";
import { CharacterBuildsBlock } from "@components/pages/BuildCreator/CharacterBuildsBlock";
import { BuildCreatorLayout } from "@components/layouts/BuildCreatorLayout";
import { useProfiles } from "@contexts/AppDataContext";
import { useState } from "react";

export const Route = createFileRoute("/buildCreator")({
  beforeLoad: async () => {
    const res = await fetch("/api/session.php");
    if (!res.ok) throw redirect({ to: "/login" });
  },
  component: BuildCreatorPage,
});

function BuildCreatorPage() {
  const profiles = useProfiles();

  const [role, setRole] = useState<DbdRole>("Killers");
  const lowercaseRole = role.toLowerCase() as Lowercase<DbdRole>;

  const [searchQuery, setSearchQuery] = useState("");

  const filtered = profiles[lowercaseRole].filter((profile) =>
    profile.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <BuildCreatorLayout setRole={setRole} searchQuery={searchQuery} setSearchQuery={setSearchQuery} >
      {searchQuery.length > 0
        ? filtered.map((character) => (
          <CharacterBuildsBlock key={character.name} character={character} />
        ))
        : profiles[lowercaseRole].map((character) => (
          <CharacterBuildsBlock key={character.name} character={character} />
        ))}
    </BuildCreatorLayout>
  );
}
