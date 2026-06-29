import type { ProfileData } from "@appTypes/Profiles";
import type { Build } from "@appTypes/Builds";

import { useBuildEditorPortalState, useBuildEditorPortalContent } from "@contexts/BuildEditor/BuildEditorPortalContext";
import { Button } from "@components/shared/Button";
import { Editor } from "./Editor/Editor";

type EditBuildButtonProps = {
  character: ProfileData;
  build: Build;
};

export const EditBuildButton = ({ character, build }: EditBuildButtonProps) => {
  const { buildEditorPortalState, openBuildEditorPortal } = useBuildEditorPortalState();
  const { setBuildEditorPortalContent } = useBuildEditorPortalContent();

  return (
    <Button className="bg-otz py-2 rounded-md" onClick={() => {
      !buildEditorPortalState && setBuildEditorPortalContent(<Editor key={`${build.name}-${Date.now()}`} character={character} build={build} />);
      !buildEditorPortalState && openBuildEditorPortal();
    }}>
      Edit
    </Button>
  );
}
