// Main Page

import { createFileRoute } from "@tanstack/react-router";
import TopText from "../components/UI/FirstPick/TopText";
import ButtonBox from "../components/UI/FirstPick/ButtonBox";

import { UnixFormated } from "../data/variables";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="flex flex-col center h-screen w-screen">
      <TopText />
      <p>Last update: {UnixFormated}</p>
      <ButtonBox />
    </main>
  );
}
