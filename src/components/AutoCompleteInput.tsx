'use client';

// TODO: infinite use query
// FIXME: 키보드 이벤트 할 때 스크롤도 내려가게(구글도 없기는한디)
// TODO: zustand 고려(selectedBook)
// TODO: 컴포넌트 분리 / compound component 고려

import { useSearchDebounce } from '@/hooks/useDebounce';
import { Book } from '@/models/bookTypes';
import { bookQueryOption } from '@/queries/bookQuery';
import { useQuery } from '@tanstack/react-query';
import { isNull } from 'es-toolkit';
import { useState } from 'react';
import Image from 'next/image';

export function AutoCompleteInput({
  setSelectedBook,
}: {
  setSelectedBook: React.Dispatch<React.SetStateAction<Book | null>>;
}) {
  const [keyword, setKeyword] = useState('');
  const [selectedIndex, setSelectedIndex] = useState<null | number>(null);
  const [isFocused, setIsFocused] = useState(false);

  const debouncedKeyword = useSearchDebounce(keyword, 400);

  const { data: books } = useQuery(bookQueryOption.books(debouncedKeyword));

  const handleFocus = () => {
    setIsFocused(true);
    setSelectedIndex(null);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setSelectedIndex(null);
  };

  return (
    <div className="relative rounded-[18px] border border-solid border-zinc-200 p-3.5">
      <BookSearchInput
        keyword={keyword}
        setKeyword={setKeyword}
        setSelectedIndex={setSelectedIndex}
        bookCount={!books ? 0 : books.length}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {isFocused && (
        <BookSearchResult
          books={books}
          selectedIndex={selectedIndex}
          isFocused={isFocused}
          keyword={keyword}
          setSelectedBook={setSelectedBook}
        />
      )}
    </div>
  );
}

function BookSearchInput({
  keyword,
  setKeyword,
  setSelectedIndex,
  bookCount,
  onFocus,
  onBlur,
}: {
  keyword: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  setSelectedIndex: React.Dispatch<React.SetStateAction<null | number>>;
  bookCount: number;
  onFocus: () => void;
  onBlur: () => void;
}) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    setSelectedIndex(null);
    setKeyword(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // TODO: enter(form 적용)와 esc(검색창 제거) 처리
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => {
        if (isNull(prev) || prev === bookCount - 1) return 0;
        return prev + 1;
      });
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => {
        if (isNull(prev) || prev === 0) return bookCount - 1;
        return prev - 1;
      });
    }
  };

  return (
    <div className="flex h-11 items-center gap-2.5 rounded-xl border border-solid border-zinc-300 px-3 py-0 shadow-none">
      <span className="shrink-0 grow-0 basis-auto text-zinc-400">
        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <circle cx="11" cy="11" r="7"></circle>
          <line x1="16.5" y1="16.5" x2="21" y2="21"></line>
        </svg>
      </span>
      <input
        placeholder="제목, 저자 검색"
        type="text"
        className="shrink grow basis-[0%] text-[15px] text-neutral-800 outline-none"
        value={keyword}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <button className="h-5.5 w-5.5 cursor-pointer rounded-[11px] border-none bg-gray-100 text-[11px] text-gray-600">
        x
      </button>
    </div>
  );
}

function BookSearchResult({
  books,
  selectedIndex,
  isFocused,
  keyword,
  setSelectedBook,
}: {
  books: Book[] | undefined;
  selectedIndex: null | number;
  isFocused: boolean;
  keyword: string;
  setSelectedBook: React.Dispatch<React.SetStateAction<Book | null>>;
}) {
  if (!books) {
    return (
      <div className="absolute top-full right-0 left-0 z-20 mt-3.5 flex h-25 flex-col items-center justify-center rounded-[10px] border border-[#e3e5e8] bg-white shadow-[0_14px_44px_rgba(20,24,32,0.12)]">
        <span className="mb-2 text-[15px] font-semibold text-gray-600">어떤 책을 기록할까요?</span>
        <span className="text-[13px] text-zinc-400">읽은 책의 제목이나 저자를 입력해 보세요.</span>
      </div>
    );
  }

  if (books.length === 0 && keyword.length !== 0) {
    return (
      <div className="absolute top-full right-0 left-0 z-20 mt-3.5 flex h-170 flex-col items-center justify-center rounded-[10px] border border-[#e3e5e8] bg-white shadow-[0_14px_44px_rgba(20,24,32,0.12)]">
        <span className="mb-1 text-zinc-400 opacity-80">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          >
            <circle cx="11" cy="11" r="7"></circle>
            <line x1="16.5" y1="16.5" x2="21" y2="21"></line>
          </svg>
        </span>

        <span className="mb-2 text-[15px] font-semibold text-gray-600">검색 결과가 없어요.</span>
        <span className="text-center text-[13px] text-zinc-400">
          &apos;{keyword}&apos;(으)로 찾은 책이 없어요.
          <br /> 다른 제목이나 저자로 검색해 보세요.
        </span>
      </div>
    );
  }

  return (
    <div className="absolute top-full right-0 left-0 z-20 mt-3.5 h-170 w-full origin-top animate-[dropSpring_0.34s_cubic-bezier(0.34,1.42,0.5,1)] overflow-y-scroll rounded-[10px] border border-[#e3e5e8] bg-white shadow-[0_14px_44px_rgba(20,24,32,0.12)]">
      {books.map((book, index) => {
        const isSelected = selectedIndex === index;

        return (
          <div
            key={book.isbn}
            className={`${isSelected ? 'bg-indigo-50 shadow-[inset_2px_0_0_var(--color-blue-600)]' : ''} ${index !== 0 ? 'border-t' : ''} border-solid border-gray-100`}
          >
            <div className="flex cursor-pointer gap-3 px-4 py-3" onMouseDown={() => setSelectedBook(book)}>
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
