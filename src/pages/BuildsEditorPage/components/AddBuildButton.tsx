import type { ProfileData } from "@/types/profiles.types";

import { useBuildsEditorPortalActions } from "@/hooks/stores/BuildsEditorStores/useBuildsEditorPortalStore";
import { Icon } from "@/components/shared/Icon";

type AddBuildButtonProps = {
  character: ProfileData;
};

export const AddBuildButton = ({ character }: AddBuildButtonProps) => {
  const { openBuildsEditorPortal } = useBuildsEditorPortalActions();

  return (
    <button
      className="border-2 border-dashed border-otz rounded-md h-full min-h-77.5 cursor-pointer"
      onClick={() => openBuildsEditorPortal({ profile: character })}
    >
      <div className="flex flex-col justify-items-center items-center">
        <Icon icon="Plus" className="text-otz size-20" />
        <p className="font-bold text-otz">
          ADD BUILD
        </p>
      </div>
    </button>
  );
}
