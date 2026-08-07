import { fetchRecords } from '@/services/record';
import { queryOptions } from '@tanstack/react-query';

export const recordsQueryOption = {
  records: () =>
    queryOptions({
      queryKey: ['records'],
      queryFn: fetchRecords,
    }),
};
