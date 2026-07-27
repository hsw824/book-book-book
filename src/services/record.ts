import { BookForm } from '@/components/Form';
import { RecordType, SimpleRecordType } from '@/models/recordTypes';
import { http } from '@/utils/axios';

export const fetchRecords = () => {
  return http.get<SimpleRecordType[]>('/api/records');
};

export const fetchRecord = (id: string) => {
  return http.get<RecordType>(`/api/records/${id}`);
};

export const postRecord = async (data: BookForm) => {
  return http.post<BookForm, BookForm>('/api/records', data);
};
