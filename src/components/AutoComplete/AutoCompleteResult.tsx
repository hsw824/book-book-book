import { Book } from '@/models/bookTypes';
import Image from 'next/image';
import { Glasses } from '../icons/Glasses';

interface Props {
  books: Book[] | undefined;
  selectedIndex: null | number;
  isInputFocused: boolean;
  keyword: string;
}

export function AutoCompleteResult({ books, selectedIndex, isInputFocused, keyword }: Props) {
  if (!books) {
    return <InitialContent isInputFocused={isInputFocused} />;
  }

  if (books.length === 0 && keyword.length !== 0) {
    return <EmptyContent keyword={keyword} />;
  }

  return <BookResultContent books={books} isInputFocused={isInputFocused} selectedIndex={selectedIndex} />;
}

function InitialContent({ isInputFocused }: { isInputFocused: boolean }) {
  return (
    <div className={`${isInputFocused ? 'h-150' : 'h-25'} flex flex-col items-center justify-center`}>
      <span className="mb-2 text-[15px] font-semibold text-gray-600">어떤 책을 기록할까요?</span>
      <span className="text-[13px] text-zinc-400">읽은 책의 제목이나 저자를 입력해 보세요.</span>
    </div>
  );
}

function EmptyContent({ keyword }: { keyword: string }) {
  return (
    <div className="flex h-150 flex-col items-center justify-center">
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
  isInputFocused,
  selectedIndex,
}: {
  books: Book[];
  isInputFocused: boolean;
  selectedIndex: null | number;
}) {
  return (
    <div
      className={`${isInputFocused ? 'h-150' : 'h-25'} -mx-3.5 mt-3.5 origin-top animate-[dropSpring_0.34s_cubic-bezier(0.34,1.42,0.5,1)] overflow-y-scroll`}
    >
      {books.map((book, index) => {
        const isSelected = selectedIndex === index;

        return (
          <div
            key={book.isbn}
            className={`${isSelected ? 'bg-indigo-50 shadow-[inset_2px_0_0_var(--color-blue-600)]' : ''} border-t border-solid border-gray-100`}
          >
            <div className="flex cursor-pointer gap-3 px-4 py-3">
              <Image src={book.thumbnail} alt="책 사진" width={46} height={64} className="rounded-[3px]" />
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
