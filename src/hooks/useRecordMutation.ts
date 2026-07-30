import { BookForm } from '@/components/Form';
import { recordQueryOption } from '@/queries/recordQuery';
import { recordsQueryOption } from '@/queries/recordsQuery';
import { deleteRecord, postRecord, updateRecord } from '@/services/record';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useRecordMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bookInfo: BookForm) => postRecord(bookInfo),
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: recordsQueryOption.records().queryKey });
    },
  });
};

export const useDeleteRecordMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteRecord(id),
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: recordsQueryOption.records().queryKey });
    },
  });
};

export const useUpdateRecordMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: BookForm }) => updateRecord(id, data),
    onSuccess: (_data, variables) => {
      return queryClient.invalidateQueries({ queryKey: recordQueryOption.record(variables.id).queryKey });
    },
  });
};
