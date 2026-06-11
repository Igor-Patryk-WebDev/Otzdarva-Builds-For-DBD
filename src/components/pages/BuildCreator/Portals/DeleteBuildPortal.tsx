import type { ProfileData } from "@appTypes/Profiles";
import type { Build, BuildsData } from "@appTypes/Builds";
import { Button } from "@components/shared/Button";
import { useQueryClient } from "@tanstack/react-query";

type DeletePortalProps = {
  onClose: () => void;
  character: ProfileData;
  build: Build;
};

export default function DeleteBuildPortal({
  onClose,
  character,
  build,
}: DeletePortalProps) {
  const queryClient = useQueryClient();

  const handleDelete = async () => {
    const res = await fetch("/api/delete_build.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        characterName: character.name,
        buildName: build.name,
      }),
    });

    const data = await res.json();
    if (data.success) {
      queryClient.setQueryData<BuildsData>(["builds"], (old) => {
        if (!old) return old;
        const killers = old.killers.map((k) => {
          if (k.name !== character.name) return k;
          return {
            ...k,
            builds: (k.builds ?? []).filter((b) => b.name !== build.name),
          };
        });
        return { ...old, killers };
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="relative bg-neutral-900 w-96 p-6 rounded-xl flex flex-col gap-6 border border-white/10">
        <h2 className="font-bold text-xl text-white text-center">
          Delete Build
        </h2>
        <p className="text-neutral-400 text-center">
          Are you sure you want to delete{" "}
          <span className="text-white font-semibold">{build.name}</span>? This
          cannot be undone.
        </p>
        <div className="flex gap-3">
          <Button color="otz" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
          <Button color="otz" className="flex-1" onClick={handleDelete}>
            Confirm Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
