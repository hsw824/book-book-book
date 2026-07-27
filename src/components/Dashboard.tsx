'use client';

import { recordQueryOption } from '@/queries/recordQuery';
import { useSuspenseQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import Image from 'next/image';

import Link from 'next/link';

export function Dashboard() {
  const { data: records } = useSuspenseQuery(recordQueryOption.records());

  return (
    <div className="relative h-full w-full bg-stone-200 p-2">
      <h1 className="mb-8 text-3xl font-bold">내 서재</h1>
      <div className="flex flex-col items-center">
        {records.map(record => (
          <div
            key={record.id}
            className="mb-3 flex w-100 translate-y-0 cursor-pointer gap-3 rounded-[20px] border border-solid border-zinc-300 bg-white px-5 py-3 transition-all duration-100 ease-in hover:-translate-y-0.5 hover:shadow-xl"
          >
            <Image src={record.book.coverUrl} alt={record.book.title} width={46} height={64} />
            <div className="flex basis-[70%] flex-col">
              <span className="text-[16px] font-semibold">{record.book.title}</span>
              <span className="text-[13px] text-gray-600">
                {record.book.author} | {record.book.publisher}
              </span>
              <p className="text-[12px] text-gray-600">{format(record.finishedAt, 'yyyy.MM.dd')}</p>
            </div>
            <div className="flex h-5 w-14 items-center justify-center rounded-2xl bg-blue-600/9 px-2.25 py-0.75 text-[12px] font-semibold text-blue-600">
              ★ {record.rating}.0
            </div>
          </div>
        ))}
      </div>
      <Link
        className="absolute right-10 bottom-0 flex h-14 w-14 scale-100 items-center justify-center rounded-[50%] border bg-blue-600 text-3xl text-white transition-all duration-100 ease-in hover:scale-105"
        href="/records/new"
      >
        +
      </Link>
    </div>
  );
}
