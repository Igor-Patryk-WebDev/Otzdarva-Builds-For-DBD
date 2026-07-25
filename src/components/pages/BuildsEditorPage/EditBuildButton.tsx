import type { ProfileData } from "@appTypes/profiles.types";
import type { Build } from "@appTypes/builds.types";

import { useBuildEditorPortalActions, useBuildEditorPortalState } from "@hooks/stores/useBuildEditorPortalStore";
import { Button } from "@components/shared/Button";
import { Editor } from "./Editor/Editor";

type EditBuildButtonProps = {
  character: ProfileData;
  build: Build;
};

export const EditBuildButton = ({ character, build }: EditBuildButtonProps) => {
  const buildEditorPortalState = useBuildEditorPortalState();
  const { setBuildEditorPortalContent, openBuildEditorPortal } = useBuildEditorPortalActions();

  return (
    <Button className="bg-otz py-2 rounded-md" onClick={() => {
      !buildEditorPortalState && setBuildEditorPortalContent(<Editor key={`${build.name}-${Date.now()}`} character={character} build={build} />);
      !buildEditorPortalState && openBuildEditorPortal();
    }}>
      Edit
    </Button>
  );
}
