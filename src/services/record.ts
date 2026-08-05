import { RecordListItem, BookRecordForm } from '@/models/recordTypes';
import { http } from '@/utils/axios';

export const fetchRecords = () => {
  return http.get<RecordListItem[]>('/api/records');
};

export const postRecord = async (data: BookRecordForm) => {
  return http.post<BookRecordForm, BookRecordForm>('/api/records', data);
};
