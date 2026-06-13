import type { ProfileData } from "@appTypes/Profiles";
import type { Build } from "@appTypes/Builds";

import { useEditorPortalContent, useEditorPortalState, useOpenEditorPortal } from "@contexts/EditorPortalContext";
import { Button } from "@components/shared/Button";
import { Editor } from "./Editor/Editor";

type EditBuildButtonProps = {
  character: ProfileData;
  build: Build;
};

export const EditBuildButton = ({ character, build }: EditBuildButtonProps) => {
  const editorPortalState = useEditorPortalState();
  const openEditorPortal = useOpenEditorPortal();
  const { setEditorPortalContent } = useEditorPortalContent();

  return (
    <Button className="bg-otz py-2 rounded-md" onClick={() => {
      !editorPortalState && setEditorPortalContent(<Editor key={build.name} character={character} build={build} />);
      !editorPortalState && openEditorPortal();
    }}>
      Edit
    </Button>
  );
}
