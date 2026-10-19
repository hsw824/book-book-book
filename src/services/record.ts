import { type RecordListItem, type BookRecordForm, type RecordDetail } from '@/models/recordTypes';
import { type Genre } from '@/constants/genre';

import { http } from '@/utils/http';

export const fetchRecords = ({ cursor, categories = [] }: { cursor?: string; categories?: Genre[] } = {}) => {
  return http.get<{ records: RecordListItem[]; nextCursor: string | null }>('/api/records', {
    params: {
      cursor,
      categories: categories.length > 0 ? categories.join(',') : undefined,
    },
  });
};

export const fetchRecordCategories = () => {
  return http.get<{ categories: Genre[] }>('/api/records/categories');
};

export const fetchRecord = (id: string) => {
  return http.get<RecordDetail>(`/api/records/${id}`);
};

export const postRecord = async (data: BookRecordForm) => {
  return http.post<BookRecordForm, BookRecordForm>('/api/records', data);
};

export const deleteRecord = async (id: string) => {
  return http.delete(`/api/records/${id}`);
};

export const updateRecord = async (id: string, data: BookRecordForm) => {
  return http.put(`/api/records/${id}`, data);
};
