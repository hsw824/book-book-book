import { fetchRecords } from '@/services/record';
import { queryOptions } from '@tanstack/react-query';

export const recordQueryOption = {
  records: () =>
    queryOptions({
      queryKey: ['records'],
      queryFn: fetchRecords,
    }),
};
