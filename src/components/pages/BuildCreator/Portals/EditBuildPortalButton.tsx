import type { ProfileData } from "@appTypes/Profiles";
import type { Build } from "@appTypes/Builds";
import { Button } from "@components/shared/Button";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import EditBuildPortal from "./EditBuildPortal";

type EditBuildPortalButtonProps = {
  character: ProfileData;
  build: Build;
};

export default function EditBuildPortalButton({
  character,
  build,
}: EditBuildPortalButtonProps) {
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
        Edit
      </Button>
      {portalState &&
        createPortal(
          <EditBuildPortal
            character={character}
            build={build}
            onClose={() => setPortalState(false)}
          />,
          document.body,
        )}
    </>
  );
}
