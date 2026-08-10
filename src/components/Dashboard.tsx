'use client';

import { RecordListItem } from '@/models/recordTypes';
import { recordsQueryOption } from '@/queries/recordsQuery';
import { useSuspenseQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import FallbackImage from '../../public/default-book-cover.svg';

export function Dashboard() {
  const { data: records } = useSuspenseQuery(recordsQueryOption.records());

  if (records.length === 0) {
    return (
      <div className="h-full w-full overflow-scroll bg-stone-200 p-2">
        <h1 className="mb-8 text-3xl font-bold">내 서재</h1>
        <div className="flex h-[80%] flex-col items-center justify-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-[50%] bg-blue-600/10">
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#2f6bdc"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"></path>
            </svg>
          </div>
          <h2 className="text-[16px] font-bold">아직 기록한 책이 없어요.</h2>
          <p className="text-[13px] text-gray-600">첫 책을 검색하고 감상을 남겨보세요.</p>
          <Link
            className="mt-4.5 flex h-11 items-center justify-center rounded-xl bg-blue-600 px-5 py-0 text-[14px] font-semibold text-white"
            href="/records/new"
          >
            책 기록하기
          </Link>
        </div>
      </div>
    );
  }
  return <DashboardContent records={records} />;
}

function DashboardContent({ records }: { records: RecordListItem[] }) {
  const router = useRouter();

  return (
    <div className="relative h-full w-full overflow-scroll bg-stone-200 p-2">
      <h1 className="mb-8 text-3xl font-bold">내 서재</h1>
      <div className="flex flex-col items-center">
        {records.map(record => (
          <div
            key={record.id}
            className="mb-3 flex w-100 translate-y-0 cursor-pointer gap-3 rounded-[20px] border border-solid border-zinc-300 bg-white px-5 py-3 transition-all duration-100 ease-in hover:-translate-y-0.5 hover:shadow-xl"
            onClick={() => router.push(`/records/${record.id}`)}
          >
            <Image src={record.book.coverUrl || FallbackImage} alt={record.book.title} width={46} height={67} />
            <div className="flex basis-[70%] flex-col">
              <span className="text-[16px] font-semibold">{record.book.title}</span>
              <span className="text-[13px] text-gray-600">
                {record.book.authors} | {record.book.publisher}
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
        className="fixed right-10 bottom-3 flex h-14 w-14 scale-100 items-center justify-center rounded-[50%] border bg-blue-600 text-3xl text-white transition-all duration-100 ease-in hover:scale-105"
        href="/records/new"
      >
        +
      </Link>
    </div>
  );
}
