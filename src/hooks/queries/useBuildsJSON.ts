import type { BuildsData } from '@appTypes/Builds';

import { useQuery } from '@tanstack/react-query';

export const useBuildsJSON = () => {
  return useQuery<BuildsData>({
    queryKey: ['builds'],
    queryFn: async () => {
      const res = await fetch('/data/builds.json', { cache: "no-store" });
      return res.json();
    },
    gcTime: 0
  })
}