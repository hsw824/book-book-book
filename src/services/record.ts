import { BookForm } from '@/components/Form';
import { http } from '@/utils/axios';

export const postRecord = async (data: BookForm) => {
  return http.post<BookForm, BookForm>('/api/records', data);
};
