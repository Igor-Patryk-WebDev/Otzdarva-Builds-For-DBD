import type { ProfileBuild } from "@appTypes/Profiles"

export const useGenericBuild = (builds: ProfileBuild[]) => {
  const genericBuild: ProfileBuild = builds["Generic Build"] ?? builds[0]
  return { build: { ...genericBuild } }
}