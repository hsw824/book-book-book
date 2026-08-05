import { BookRecordForm } from '@/models/recordTypes';
import { postRecord } from '@/services/record';
import { useMutation } from '@tanstack/react-query';

export const useRecordMutation = () => {
  return useMutation({
    mutationFn: (bookInfo: BookRecordForm) => postRecord(bookInfo),
  });
};
