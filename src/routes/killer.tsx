
import { createFileRoute, Link } from "@tanstack/react-router";

import CharacterBox from "../components/UI/CharBox/CharacterBox";
import UniversalKiller from "../components/UI/CharBox/UniversalKiller";
import Button from "../components/Interractive/Button";

export const Route = createFileRoute("/killer")({
  component: RouteComponent,
});

function RouteComponent() {

  return (
    <div className="">
      <Button />
      <UniversalKiller />
      <CharacterBox />
    </div>
  );
}


