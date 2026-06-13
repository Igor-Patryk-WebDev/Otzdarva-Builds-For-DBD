import type { ProfileData } from "@appTypes/Profiles";

import { useEditorPortalContent, useEditorPortalState, useOpenEditorPortal } from "@contexts/EditorPortalContext";
import { Button } from "@components/shared/Button";
import { Editor } from "./Editor/Editor";

type AddBuildButtonProps = {
  character: ProfileData;
};

export const AddBuildButton = ({ character }: AddBuildButtonProps) => {
  const editorPortalState = useEditorPortalState();
  const openEditorPortal = useOpenEditorPortal();
  const { setEditorPortalContent } = useEditorPortalContent();

  return (
    <Button className="border-2 border-dashed border-otz rounded-md h-77.5" onClick={() => {
      !editorPortalState && setEditorPortalContent(<Editor character={character} />);
      !editorPortalState && openEditorPortal();
    }}
    >
      <p className="font-bold text-otz">
        ADD BUILD
      </p>
    </Button>
  );
}
