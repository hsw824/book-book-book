'use client';

// TODO: infinite use query
// FIXME: 키보드 이벤트 할 때 스크롤도 내려가게(구글도 없기는한디)
// TODO: zustand 고려
// TODO: 컴포넌트 분리 / compound component 고려

import { useSearchDebounce } from '@/hooks/useDebounce';
import { bookQueryOption } from '@/queries/bookQuery';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { BookSearchInput } from './AutoCompleteInput';
import { AutoCompleteResult } from './AutoCompleteResult';

export function AutoCompleteBook() {
  const [keyword, setKeyword] = useState('');
  const [selectedIndex, setSelectedIndex] = useState<null | number>(null);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const debouncedKeyword = useSearchDebounce(keyword, 400);

  const { data: books } = useQuery(bookQueryOption.books(debouncedKeyword));

  const handleFocus = () => {
    setIsInputFocused(true);
    setSelectedIndex(null);
  };

  const handleBlur = () => {
    setIsInputFocused(false);
    setSelectedIndex(null);
  };

  return (
    <div className="mx-auto my-0 w-105 rounded-[18px] border border-solid border-zinc-200 p-3.5">
      <BookSearchInput
        keyword={keyword}
        setKeyword={setKeyword}
        setSelectedIndex={setSelectedIndex}
        bookCount={!books ? 0 : books.length}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {isInputFocused && (
        <AutoCompleteResult
          books={books}
          selectedIndex={selectedIndex}
          isInputFocused={isInputFocused}
          keyword={keyword}
        />
      )}
    </div>
  );
}
