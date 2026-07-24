import { BookForm } from '@/components/Form';
import { postRecord } from '@/services/record';
import { useMutation } from '@tanstack/react-query';

export const useRecordMutation = () => {
  return useMutation({
    mutationFn: (bookInfo: BookForm) => postRecord(bookInfo),
  });
};
