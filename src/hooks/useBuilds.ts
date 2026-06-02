import { useQuery } from '@tanstack/react-query';
import type { BuildsData } from '@appTypes/Builds';

export const useBuilds = () => {
  return useQuery<BuildsData>({
    queryKey: ['builds'],
    queryFn: async () => {
      const res = await fetch('/data/builds.json');
      return res.json();
    }
  })
}