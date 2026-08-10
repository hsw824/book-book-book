import { BookSummary } from '@/models/bookTypes';
import Image from 'next/image';
import { Glasses } from '../icons/Glasses';
import FallbackImage from '../../../public/default-book-cover.svg';

interface Props {
  books: BookSummary[] | undefined;
  selectedIndex: null | number;
  keyword: string;
  onChange: (book: BookSummary) => void;
}

export function AutoCompleteResult({ books, selectedIndex, keyword, onChange }: Props) {
  if (!books) {
    return <InitialContent />;
  }

  if (books.length === 0 && keyword.length !== 0) {
    return <EmptyContent keyword={keyword} />;
  }

  return <BookResultContent books={books} selectedIndex={selectedIndex} onChange={onChange} />;
}

function InitialContent() {
  return (
    <div className="absolute top-full right-0 left-0 z-20 mt-3.5 flex h-25 flex-col items-center justify-center rounded-[10px] border border-[#e3e5e8] bg-white shadow-[0_14px_44px_rgba(20,24,32,0.12)]">
      <span className="mb-2 text-[15px] font-semibold text-gray-600">어떤 책을 기록할까요?</span>
      <span className="text-[13px] text-zinc-400">읽은 책의 제목이나 저자를 입력해 보세요.</span>
    </div>
  );
}

function EmptyContent({ keyword }: { keyword: string }) {
  return (
    <div className="absolute top-full right-0 left-0 z-20 mt-3.5 flex h-170 flex-col items-center justify-center rounded-[10px] border border-[#e3e5e8] bg-white shadow-[0_14px_44px_rgba(20,24,32,0.12)]">
      <span className="mb-1 text-zinc-400 opacity-80">
        <Glasses width="32" height="32" strokeWidth="1.6" />
      </span>

      <span className="mb-2 text-[15px] font-semibold text-gray-600">검색 결과가 없어요.</span>
      <span className="text-center text-[13px] text-zinc-400">
        &apos;{keyword}&apos;(으)로 찾은 책이 없어요.
        <br /> 다른 제목이나 저자로 검색해 보세요.
      </span>
    </div>
  );
}

function BookResultContent({
  books,
  selectedIndex,
  onChange,
}: {
  books: BookSummary[];
  selectedIndex: null | number;
  onChange: (book: BookSummary) => void;
}) {
  return (
    <div className="absolute top-full right-0 left-0 z-20 mt-3.5 h-170 w-full origin-top animate-[dropSpring_0.34s_cubic-bezier(0.34,1.42,0.5,1)] overflow-y-scroll rounded-[10px] border border-[#e3e5e8] bg-white shadow-[0_14px_44px_rgba(20,24,32,0.12)]">
      {books.map((book, index) => {
        const isSelected = selectedIndex === index;

        return (
          <div
            key={book.isbn}
            className={`${isSelected ? 'bg-indigo-50 shadow-[inset_2px_0_0_var(--color-blue-600)]' : ''} border-t border-solid border-gray-100`}
          >
            <div onMouseDown={() => onChange(book)} className="flex cursor-pointer gap-3 px-4 py-3">
              <Image src={book.coverUrl || FallbackImage} alt="책 사진" width={46} height={67} />
              <div className="flex flex-col justify-start">
                <span className="text-[15px] font-medium text-neutral-800">{book.title}</span>
                <span className="mt-0.75 text-[13px]/[1.3] text-gray-600">{book.authors}</span>
                <span className="mt-0.5 text-[13px]/[1.3] text-zinc-400">{book.publisher}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
