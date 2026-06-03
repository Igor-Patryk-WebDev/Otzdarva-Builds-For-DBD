import type { Build } from "@appTypes/Builds"

export const useGenericBuild = (builds: Build[]) => {
  const genericBuild = builds["Generic Build"] ?? builds[0]
  return { build: { ...genericBuild } }
}