// import type { ProfileData } from "@/types/profiles.types";
// import type { Build } from "@/types/builds.types";

import { Button } from "@/components/shared/Button";
// import { Editor } from "./BuildsEditor/BuildsEditor";

// type EditBuildButtonProps = {
//   character: ProfileData;
//   build: Build;
// };

export const EditBuildButton = () => {

  return (
    <Button className="bg-otz py-2 rounded-md" onClick={() => {
      // !buildEditorPortalState && setBuildEditorPortalContent(<Editor key={`${build.name}-${Date.now()}`} character={character} build={build} />);
      // !buildEditorPortalState && openBuildEditorPortal();
    }}>
      Edit
    </Button>
  );
}
