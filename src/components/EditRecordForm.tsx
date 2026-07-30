'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { BookForm, Form } from './Form';
import { recordQueryOption } from '@/queries/recordQuery';
import { RecordType } from '@/models/recordTypes';
import { GENRE_MAP } from '@/constant/genre';
import { Rating } from '@/constant/rate';
import { format } from 'date-fns';

export function EditRecordForm({ id }: { id: string }) {
  const { data: recordData } = useSuspenseQuery(recordQueryOption.record(id));
  const toFormRecordData = (recordData: RecordType): BookForm => {
    return {
      bookInfo: {
        authors: recordData.book.author,
        datetime: recordData.book.publishedYear,
        publisher: recordData.book.publisher,
        thumbnail: recordData.book.coverUrl,
        title: recordData.book.title,
        isbn: recordData.book.isbn,
      },
      finishedAt: format(recordData.finishedAt, 'yyyy-MM-dd'),
      review: recordData.review,
      quotes: recordData.quotes,
      genre: GENRE_MAP[recordData.category],
      rating: recordData.rating as Rating,
      isEbook: recordData.isEbook,
    };
  };
  const formRecordData = toFormRecordData(recordData);

  return <Form editFormData={formRecordData} mode="edit" id={id} />;
}
