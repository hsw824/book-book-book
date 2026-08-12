import { fetchRecords } from '@/services/record';
import { infiniteQueryOptions } from '@tanstack/react-query';

export const recordsQueryOption = {
  records: () =>
    infiniteQueryOptions({
      queryKey: ['records'],
      queryFn: ({ pageParam }) => fetchRecords(pageParam),
      initialPageParam: undefined as string | undefined,
      getNextPageParam: lastPageData => lastPageData.nextCursor,
    }),
};
