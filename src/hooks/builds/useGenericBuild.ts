import type { ProfileBuild } from "@appTypes/Profiles"

export const useGenericBuild = (builds: ProfileBuild[] | undefined) => {
  if (!builds || builds.length === 0) return { build: null };

  const genericBuild: ProfileBuild = builds.find((b) => b.name === "Generic Build") ?? builds[0]
  return { build: { ...genericBuild } }
}