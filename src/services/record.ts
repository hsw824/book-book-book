import { BookRecordForm, RecordType } from '@/models/recordTypes';

import { http } from '@/utils/http';

export const fetchRecords = () => {
  return http.get<RecordType[]>('/api/records');
};

export const fetchRecord = (id: string) => {
  return http.get<RecordType>(`/api/records/${id}`);
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
