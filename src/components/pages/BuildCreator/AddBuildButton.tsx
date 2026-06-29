import type { ProfileData } from "@appTypes/Profiles";

import { useBuildEditorPortalState, useBuildEditorPortalContent } from "@contexts/BuildEditor/BuildEditorPortalContext";
import { IconSVG } from "@components/shared/IconSVG";
import { Button } from "@components/shared/Button";
import { Editor } from "./Editor/Editor";

type AddBuildButtonProps = {
  character: ProfileData;
};

export const AddBuildButton = ({ character }: AddBuildButtonProps) => {
  const { buildEditorPortalState, openBuildEditorPortal } = useBuildEditorPortalState();
  const { setBuildEditorPortalContent } = useBuildEditorPortalContent();

  return (
    <Button className="border-2 border-dashed border-otz rounded-md h-77.5" onClick={() => {
      !buildEditorPortalState && setBuildEditorPortalContent(<Editor key={`new-build-${Date.now()}`} character={character} />);
      !buildEditorPortalState && openBuildEditorPortal();
    }}
    >
      <div className="flex flex-col justify-items-center items-center">
        <IconSVG icon="Plus" size={6} className="text-otz" />
        <p className="font-bold text-otz">
          ADD BUILD
        </p>
      </div>
    </Button>
  );
}
