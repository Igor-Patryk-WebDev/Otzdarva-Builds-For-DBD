import type { BuildsData } from '@appTypes/builds.types';

import { buildsSchema } from '@schemas/builds.schema';
import { useQuery } from '@tanstack/react-query';

export const useBuildsJSON = () => {
  return useQuery<BuildsData>({
    queryKey: ['builds'],
    queryFn: async () => {
      const res = await fetch('/data/builds.json', { cache: "no-store" });
      return buildsSchema.parse(await res.json());
    }
  });
};
