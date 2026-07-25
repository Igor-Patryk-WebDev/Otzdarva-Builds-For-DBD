import type { ProfileData } from "@appTypes/profiles.types";

import { IconSVG } from "@components/shared/IconSVG";
import { Button } from "@components/shared/Button";
import { Editor } from "./Editor/Editor";
import { useBuildEditorPortalActions, useBuildEditorPortalState } from "@hooks/stores/useBuildEditorPortalStore";

type AddBuildButtonProps = {
  character: ProfileData;
};

export const AddBuildButton = ({ character }: AddBuildButtonProps) => {
  const buildEditorPortalState = useBuildEditorPortalState();
  const { setBuildEditorPortalContent, openBuildEditorPortal } = useBuildEditorPortalActions();

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
