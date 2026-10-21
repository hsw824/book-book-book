import { CATEGORIES, type Category } from '@/constants/category';
import { fetchRecordCategories, fetchRecords } from '@/services/record';
import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';

export const recordsQueryOption = {
  all: () => ['records'] as const,
  records: (categories: Category[] = []) =>
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
      select: ({ categories }) => CATEGORIES.filter((category) => categories.includes(category)),
    }),
};
