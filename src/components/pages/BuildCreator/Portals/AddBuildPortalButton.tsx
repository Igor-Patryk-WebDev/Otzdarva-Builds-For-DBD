import type { ProfileData } from "@appTypes/Profiles";

import { Button } from "@components/shared/Button";
import { useState } from "react";
import { createPortal } from "react-dom";
import AddBuildPortal from "./AddBuildPortal";

type PortalButtonProps = {
  children: React.ReactNode;
  character: ProfileData;
};

export default function PortalButton({
  children,
  character,
}: PortalButtonProps) {
  const [portalState, setPortalState] = useState(false);

  if (portalState) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }

  return (
    <>
      <Button
        onClick={() => {
          setPortalState(true);
          console.log(character.name);
        }}
        color="otz"
        className="absolute bottom-0 z-30 right-[50%] translate-x-[50%]"
      >
        {children}
      </Button>
      {portalState &&
        createPortal(
          <AddBuildPortal
            character={character}
            onClose={() => setPortalState(false)}
          />,
          document.body,
        )}
    </>
  );
}
