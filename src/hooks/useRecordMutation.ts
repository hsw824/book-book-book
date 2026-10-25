import { recordQueryOption } from '@/queries/recordQuery';
import { recordsQueryOption } from '@/queries/recordsQuery';
import { deleteRecord, postRecord, updateRecord } from '@/services/record';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { type BookRecordForm } from '@/models/recordTypes';

export const useCreateRecordMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bookInfo: BookRecordForm) => postRecord(bookInfo),
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: recordsQueryOption.all() });
    },
  });
};

export const useDeleteRecordMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteRecord(id),
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: recordsQueryOption.all() });
    },
  });
};
export const useUpdateRecordMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: BookRecordForm }) => updateRecord(id, data),
    onSuccess: (_data, variables) => {
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: recordQueryOption.record(variables.id).queryKey }),
        queryClient.invalidateQueries({ queryKey: recordsQueryOption.all() }),
      ]);
    },
  });
};
