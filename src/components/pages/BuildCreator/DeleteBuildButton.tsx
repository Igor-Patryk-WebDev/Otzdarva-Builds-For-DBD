import type { ProfileData } from "@appTypes/Profiles";
import type { Build } from "@appTypes/Builds";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@components/shared/Button";

type DeleteBuildButtonProps = {
  character: ProfileData;
  build: Build;
};

export const DeleteBuildButton = ({ character, build }: DeleteBuildButtonProps) => {
  const queryClient = useQueryClient();
  const [confirming, setConfirming] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    setIsDeleting(true);
    setError(null);

    try {
      const res = await fetch("/api/delete_build.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          characterName: character.name,
          buildName: build.name,
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        setError(json.error ?? "Delete failed.");
        setConfirming(false);
        return;
      }

      await queryClient.invalidateQueries({ queryKey: ["builds"] });
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  if (confirming) {
    return (
      <div className="flex flex-col gap-1">
        <p className="text-xs text-neutral-400 text-center">
          Delete <span className="text-white font-semibold">"{build.name}"</span>?
        </p>
        <div className="grid grid-cols-2 gap-1">
          <Button
            className="bg-red-600 hover:bg-red-700 py-1.5 rounded-md text-sm disabled:opacity-50 transition"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "..." : "Yes, delete"}
          </Button>
          <Button
            className="bg-neutral-700 hover:bg-neutral-600 py-1.5 rounded-md text-sm transition"
            onClick={() => setConfirming(false)}
            disabled={isDeleting}
          >
            Cancel
          </Button>
        </div>
        {error && <p className="text-red-400 text-xs">{error}</p>}
      </div>
    );
  }

  return (
    <Button
      className="bg-otz py-2 rounded-md transition"
      onClick={() => setConfirming(true)}
    >
      Delete
    </Button>
  );
};
