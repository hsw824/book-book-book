import { GENRES, type Genre } from '@/constants/genre';
import { fetchRecordCategories, fetchRecords } from '@/services/record';
import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';

export const recordsQueryOption = {
  all: () => ['records'] as const,
  records: (categories: Genre[] = []) =>
    infiniteQueryOptions({
      queryKey: [...recordsQueryOption.all(), { categories }],
      queryFn: ({ pageParam }) => fetchRecords({ cursor: pageParam, categories }),
      initialPageParam: undefined as string | undefined,
      getNextPageParam: (lastPageData) => lastPageData.nextCursor,
    }),
  categories: () =>
    queryOptions({
      queryKey: [...recordsQueryOption.all(), 'categories'],
      queryFn: fetchRecordCategories,
      select: ({ categories }) => GENRES.filter((genre) => categories.includes(genre)),
    }),
};
