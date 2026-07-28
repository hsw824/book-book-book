'use client';

import { GENRE_MAP } from '@/constant/genre';
import { RATINGS } from '@/constant/rate';
import { QuoteType, RecordType } from '@/models/recordTypes';
import { recordQueryOption } from '@/queries/recordQuery';
import { useSuspenseQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import Image from 'next/image';
import { RecordDeleteDialog } from './RecordDeleteDialog';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDeleteRecordMutation } from '@/hooks/useRecordMutation';
import toast from 'react-hot-toast';

export function RecordDetail({ id }: { id: string }) {
  const { data: recordData } = useSuspenseQuery(recordQueryOption.record(id));
  const { mutateAsync: deleteMutationAsync, isPending } = useDeleteRecordMutation();
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await deleteMutationAsync(id);
      toast.success('삭제되었습니다.');
      setOpen(false);
      router.push('/');
    } catch {
      toast.error('오류가 발생했어요. 다시 시도해 주세요.');
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center bg-stone-200">
      <div className="h-150 w-135 rounded-[20px] bg-white p-5">
        <BookInfoArea recordData={recordData} handleOpen={() => setOpen(true)} />
        <hr className="mt-4 text-gray-100" />
        <BookReview review={recordData.review} />
        <BookQuotes quotes={recordData.quotes} />
      </div>
      <RecordDeleteDialog open={open} close={() => setOpen(false)} onDelete={handleDelete} isPending={isPending} />
    </div>
  );
}

function BookInfoArea({ recordData, handleOpen }: { recordData: RecordType; handleOpen: () => void }) {
  return (
    <div>
      <div className="my-2 flex gap-4">
        <Image
          className="rounded-[20px] border border-zinc-200/50"
          width={100}
          height={100}
          src={recordData.book.coverUrl}
          alt={recordData.book.coverUrl}
        />
        <div className="flex basis-[55%] flex-col justify-center gap-2">
          <h2 className="text-xl font-bold">{recordData.book.title}</h2>
          <p className="text-[14px] text-gray-600">{recordData.book.author}</p>
          <p className="text-[12px] text-zinc-400">{recordData.book.publisher}</p>
        </div>
        <div>
          <button className="mr-2 h-8.5 w-8.5 cursor-pointer rounded-[9px] border border-zinc-200 p-2">
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 20h9"></path>
              <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path>
            </svg>
          </button>

          <button className="h-8.5 w-8.5 cursor-pointer rounded-[9px] border border-zinc-200 p-2" onClick={handleOpen}>
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 6h18"></path>
              <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
          </button>
        </div>
      </div>
      <div className="flex items-center gap-10">
        <div className="flex w-22">
          {RATINGS.map(rate => (
            <svg
              key={rate}
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="currentColor"
              className={rate <= recordData.rating ? 'text-blue-600' : 'text-zinc-300'}
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
            </svg>
          ))}
        </div>

        <span className="flex h-6 w-14 items-center justify-center rounded-2xl bg-blue-600/9 text-[12px] font-semibold text-blue-600">
          {GENRE_MAP[recordData.category]}
        </span>

        <span className="text-[13px] text-gray-600">{format(recordData.finishedAt, 'yyyy.MM.dd')} 완독</span>

        <p className="flex items-center">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          >
            <rect x="4" y="2" width="16" height="20" rx="2"></rect>
            <line x1="8" y1="6" x2="16" y2="6"></line>
          </svg>
          <span className="ml-2 text-[12px] text-gray-600"> {recordData.isEbook ? 'ebook' : '종이책'}</span>
        </p>
      </div>
    </div>
  );
}

function BookReview({ review }: { review: string }) {
  return (
    <div>
      <p className="text- mt- mt-7 mb-3 text-[12px] font-semibold text-zinc-400">감상</p>
      <p className="text-[15px] break-normal wrap-break-word">{review}</p>
    </div>
  );
}

function BookQuotes({ quotes }: { quotes: QuoteType[] }) {
  if (quotes.length === 0) {
    return (
      <div className="mt-7 mb-3 rounded-xl border border-dotted border-zinc-200 py-5 text-center">
        <p className="text-[15px] font-bold">필사하고 싶은 구절이 없어요.</p>
        <span className="text-[12px] text-zinc-400">수정버튼을 클릭하면 필사하고 싶은 구절을 추가할 수 있습니다.</span>
      </div>
    );
  }
  return (
    <div>
      {quotes.map(quote => {
        return (
          <div key={quote.id}>
            <p className="mt-7 mb-3 text-[12px] font-semibold text-zinc-400">필사하고 싶은 구절</p>
            <div className="border-l-2 border-zinc-200 pl-5">
              <p className="text-[15px] break-normal wrap-break-word italic">{quote.text}</p>
              <span className="text-[12px] text-zinc-400">p. {quote.page}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
