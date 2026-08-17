'use client';

import { GENRE_MAP } from '@/constants/genre';
import { RATINGS } from '@/constants/rate';
import { Quote, RecordDetail } from '@/models/recordTypes';
import { recordQueryOption } from '@/queries/recordQuery';
import { useSuspenseQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import Image from 'next/image';
import { RecordDeleteDialog } from './RecordDeleteDialog';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDeleteRecordMutation } from '@/hooks/useRecordMutation';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { ROUTE } from '@/constants/path';
import FallbackImage from '../../public/default-book-cover.svg';
import { Star } from './icons/Star';
import { Pencil } from './icons/Pencil';
import { Garbage } from './icons/Garbage';
import { Book } from './icons/Book';

export function RecordDetailContent({ id }: { id: string }) {
  const { data: recordData } = useSuspenseQuery(recordQueryOption.record(id));
  const { mutateAsync: deleteMutationAsync, isPending } = useDeleteRecordMutation();
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await deleteMutationAsync(id);
      toast.success('삭제되었습니다.');
      setOpen(false);
      router.push(ROUTE.HOME);
    } catch {
      toast.error('오류가 발생했어요. 다시 시도해 주세요.');
    }
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-stone-200">
      <div className="h-150 w-105 overflow-y-scroll rounded-[20px] bg-white p-5 sm:w-135">
        <Link href={ROUTE.HOME} className="mb-2 cursor-pointer text-sm text-gray-600">
          &lt; 목록으로
        </Link>
        <BookInfoArea recordData={recordData} handleOpen={() => setOpen(true)} id={id} />
        <hr className="mt-4 text-gray-100" />
        <BookReview review={recordData.review} />
        <BookQuotes quotes={recordData.quotes} />
      </div>
      <RecordDeleteDialog open={open} close={() => setOpen(false)} onDelete={handleDelete} isPending={isPending} />
    </div>
  );
}

function BookInfoArea({
  recordData,
  handleOpen,
  id,
}: {
  recordData: RecordDetail;
  handleOpen: () => void;
  id: string;
}) {
  const router = useRouter();

  return (
    <div>
      <div className="my-2 flex gap-4">
        <Image
          className="rounded-[20px] border border-zinc-200/50"
          width={100}
          height={100}
          src={recordData.book.coverUrl || FallbackImage}
          alt={recordData.book.coverUrl}
        />
        <div className="flex basis-[55%] flex-col justify-center gap-2">
          <h2 className="text-xl font-bold">{recordData.book.title}</h2>
          <p className="text-[14px] text-gray-600">{recordData.book.authors}</p>
          <p className="text-[12px] text-zinc-400">{recordData.book.publisher}</p>
        </div>
        <div className="flex">
          <button
            className="mr-2 h-8.5 w-8.5 cursor-pointer rounded-[9px] border border-zinc-200 p-2"
            onClick={() => router.push(`/records/${id}/edit`)}
          >
            <Pencil width="17" height="17" strokeWidth="2" />
          </button>

          <button className="h-8.5 w-8.5 cursor-pointer rounded-[9px] border border-zinc-200 p-2" onClick={handleOpen}>
            <Garbage width="17" height="17" strokeWidth="2" />
          </button>
        </div>
      </div>
      <div className="flex items-center gap-6 sm:gap-10">
        <div className="flex w-22">
          {RATINGS.map(rate => (
            <Star
              key={rate}
              width="26"
              height="26"
              className={rate <= recordData.rating ? 'text-blue-600' : 'text-zinc-300'}
            />
          ))}
        </div>

        <span className="flex h-6 w-14 items-center justify-center rounded-2xl bg-blue-600/9 text-[12px] font-semibold text-blue-600">
          {GENRE_MAP[recordData.category]}
        </span>

        <span className="text-[13px] text-gray-600">{format(recordData.finishedAt, 'yyyy.MM.dd')} 완독</span>

        <p className="flex items-center">
          <Book width="12" height="12" strokeWidth="2.2" />
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

function BookQuotes({ quotes }: { quotes: Quote[] }) {
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
      <p className="mt-7 mb-3 text-[12px] font-semibold text-zinc-400">필사하고 싶은 구절</p>

      {quotes.map(quote => {
        return (
          <div key={quote.id} className="mb-4">
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
