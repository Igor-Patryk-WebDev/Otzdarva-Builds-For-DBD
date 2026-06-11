import type { ProfileData } from "@appTypes/Profiles";
import type { Build } from "@appTypes/Builds";
import { Button } from "@components/shared/Button";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import DeleteBuildPortal from "./DeleteBuildPortal";

type DeleteBuildPortalButtonProps = {
  character: ProfileData;
  build: Build;
};

export default function DeleteBuildPortalButton({
  character,
  build,
}: DeleteBuildPortalButtonProps) {
  const [portalState, setPortalState] = useState(false);

  useEffect(() => {
    document.body.style.overflow = portalState ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [portalState]);

  return (
    <>
      <Button color="otz" onClick={() => setPortalState(true)}>
        Delete
      </Button>
      {portalState &&
        createPortal(
          <DeleteBuildPortal
            character={character}
            build={build}
            onClose={() => setPortalState(false)}
          />,
          document.body,
        )}
    </>
  );
}
