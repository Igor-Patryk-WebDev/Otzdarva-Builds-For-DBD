import type { ProfileBuild, ProfileData } from "@/types/profiles.types";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

export type UseReorderBuildsOptions = {
  characterName?: string;
  initialBuilds?: ProfileBuild[];
  profile?: ProfileData;
  onSuccess?: () => void;
  onError?: (error: string) => void;
};

export type UseReorderBuildsReturn = {
  builds: ProfileBuild[];
  hasChanges: boolean;
  isSaving: boolean;
  saveError: string | null;
  saveSuccess: boolean;
  moveBuild: (fromIndex: number, toIndex: number) => void;
  moveBuildLeft: (index: number) => void;
  moveBuildRight: (index: number) => void;
  moveBuildPrev: (index: number) => void;
  moveBuildNext: (index: number) => void;
  canMoveLeft: (index: number) => boolean;
  canMoveRight: (index: number) => boolean;
  canMovePrev: (index: number) => boolean;
  canMoveNext: (index: number) => boolean;
  resetOrder: () => void;
  saveOrder: () => Promise<boolean>;
};

export function reorderArray<T>(list: T[], fromIndex: number, toIndex: number): T[] {
  if (
    fromIndex < 0 ||
    fromIndex >= list.length ||
    toIndex < 0 ||
    toIndex >= list.length ||
    fromIndex === toIndex
  ) {
    return list;
  }
  const result = [...list];
  const [removed] = result.splice(fromIndex, 1);
  result.splice(toIndex, 0, removed);
  return result;
}

export const useReorderBuilds = ({
  characterName: characterNameProp,
  initialBuilds: initialBuildsProp,
  profile,
  onSuccess,
  onError,
}: UseReorderBuildsOptions): UseReorderBuildsReturn => {
  const characterName = profile?.name ?? characterNameProp ?? "";
  const initialBuilds = useMemo(
    () => profile?.builds ?? initialBuildsProp ?? [],
    [profile?.builds, initialBuildsProp]
  );

  const queryClient = useQueryClient();
  const [localBuilds, setLocalBuilds] = useState<ProfileBuild[] | null>(null);
  const [prevCharacterName, setPrevCharacterName] = useState(characterName);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const successTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // If characterName changed on the same component instance, reset local reordering
  if (prevCharacterName !== characterName) {
    setPrevCharacterName(characterName);
    setLocalBuilds(null);
    setSaveError(null);
    setSaveSuccess(false);
  }

  const builds = localBuilds ?? initialBuilds;

  // Determine whether current builds differ from initial builds
  const hasChanges = useMemo(() => {
    if (!localBuilds) return false;
    if (localBuilds.length !== initialBuilds.length) return true;
    return localBuilds.some((build, index) => build.name !== initialBuilds[index]?.name);
  }, [localBuilds, initialBuilds]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (successTimeoutRef.current) {
        clearTimeout(successTimeoutRef.current);
      }
    };
  }, []);

  const moveBuild = useCallback(
    (fromIndex: number, toIndex: number) => {
      setLocalBuilds((current) => reorderArray(current ?? initialBuilds, fromIndex, toIndex));
      setSaveError(null);
      setSaveSuccess(false);
    },
    [initialBuilds]
  );

  const moveBuildLeft = useCallback(
    (index: number) => {
      moveBuild(index, index - 1);
    },
    [moveBuild]
  );

  const moveBuildRight = useCallback(
    (index: number) => {
      moveBuild(index, index + 1);
    },
    [moveBuild]
  );

  const canMoveLeft = useCallback((index: number) => index > 0, []);
  const canMoveRight = useCallback(
    (index: number) => index < builds.length - 1,
    [builds.length]
  );

  const resetOrder = useCallback(() => {
    setLocalBuilds(null);
    setSaveError(null);
    setSaveSuccess(false);
  }, []);

  const saveOrder = useCallback(async (): Promise<boolean> => {
    if (!characterName) {
      setSaveError("Character name is missing.");
      return false;
    }

    if (!hasChanges) return true;

    setIsSaving(true);
    setSaveError(null);
    setSaveSuccess(false);

    try {
      const response = await fetch("/api/reorder_builds.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          characterName,
          builds,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        const errorMsg = data?.error ?? "Failed to save order.";
        setSaveError(errorMsg);
        onError?.(errorMsg);
        return false;
      }

      setLocalBuilds(null);
      await queryClient.invalidateQueries({ queryKey: ["builds"] });
      setSaveSuccess(true);
      onSuccess?.();

      if (successTimeoutRef.current) {
        clearTimeout(successTimeoutRef.current);
      }
      successTimeoutRef.current = setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);

      return true;
    } catch {
      const errorMsg = "Network error. Please try again.";
      setSaveError(errorMsg);
      onError?.(errorMsg);
      return false;
    } finally {
      setIsSaving(false);
    }
  }, [characterName, hasChanges, builds, queryClient, onSuccess, onError]);

  return {
    builds,
    hasChanges,
    isSaving,
    saveError,
    saveSuccess,
    moveBuild,
    moveBuildLeft,
    moveBuildRight,
    moveBuildPrev: moveBuildLeft,
    moveBuildNext: moveBuildRight,
    canMoveLeft,
    canMoveRight,
    canMovePrev: canMoveLeft,
    canMoveNext: canMoveRight,
    resetOrder,
    saveOrder,
  };
};
