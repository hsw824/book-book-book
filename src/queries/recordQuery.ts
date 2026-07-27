import { fetchRecord } from '@/services/record';
import { queryOptions } from '@tanstack/react-query';

export const recordQueryOption = {
  record: (id: string) =>
    queryOptions({
      queryKey: ['record', id],
      queryFn: () => fetchRecord(id),
    }),
};
