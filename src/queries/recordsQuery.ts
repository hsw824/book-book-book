import { CATEGORIES } from '@/constants/category';
import { type RecordFilter } from '@/models/recordTypes';
import { fetchRecordCategories, fetchRecords } from '@/services/record';
import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';

export const recordsQueryOption = {
  all: () => ['records'] as const,
  records: (filter: RecordFilter) =>
    infiniteQueryOptions({
      queryKey: [...recordsQueryOption.all(), filter],
      queryFn: ({ pageParam }) => fetchRecords({ cursor: pageParam, ...filter }),
      initialPageParam: undefined as string | undefined,
      getNextPageParam: (lastPageData) => lastPageData.nextCursor,
      select: (data) => data.pages.flatMap((page) => page.records),
    }),
  categories: () =>
    queryOptions({
      queryKey: [...recordsQueryOption.all(), 'categories'],
      queryFn: fetchRecordCategories,
      select: ({ categories }) => CATEGORIES.filter((category) => categories.includes(category)),
    }),
};
