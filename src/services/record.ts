import { BookForm } from '@/components/Form';
import { RecordType } from '@/models/recordTypes';
import { http } from '@/utils/axios';

export const fetchRecords = () => {
  return http.get<RecordType[]>('/api/records');
};

export const postRecord = async (data: BookForm) => {
  return http.post<BookForm, BookForm>('/api/records', data);
};
