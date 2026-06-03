import type { Build } from "@appTypes/Builds";

export const useBuild = (build: Build) => {
  return { build: { ...build } }
}