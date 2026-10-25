import { type RecordListItem, type BookRecordForm, type RecordDetail } from '@/models/recordTypes';
import { type Category } from '@/constants/category';

import { http } from '@/utils/http';

export const fetchRecords = ({ cursor, categories = [] }: { cursor?: string; categories?: Category[] } = {}) => {
  const params = new URLSearchParams();

  if (cursor) {
    params.set('cursor', cursor);
  }

  if (categories.length > 0) {
    params.set('categories', categories.join());
  }

  return http.get<{ records: RecordListItem[]; nextCursor: string | null }>('/api/records', { params });
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

export const fetchRecordCategories = () => {
  return http.get<{ categories: Category[] }>('/api/records/categories');
};
