"use client";

import { useSearchDebounce } from "@/hooks/useDebounce";
import { Book } from "@/models/bookTypes";
import { bookQueryOption } from "@/queries/bookQuery";
import { useQuery } from "@tanstack/react-query";
import { isNull } from "es-toolkit";
import { useState } from "react";

export function AutoCompleteInput() {
  const [search, setSearch] = useState("데미안");
  const [selectedIndex, setSelectedIndex] = useState<null | number>(null);

  const debouncedSearch = useSearchDebounce(search, 400);

  const { data: books } = useQuery(bookQueryOption.books(debouncedSearch));

  return (
    <>
      <SearchBookInput
        search={search}
        setSearch={setSearch}
        setSelectedIndex={setSelectedIndex}
        totalBookLength={!books ? 0 : books.length}
      />
      <BookList books={books} selectedIndex={selectedIndex} />
    </>
  );
}

function SearchBookInput({
  search,
  setSearch,
  setSelectedIndex,
  totalBookLength,
}: {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setSelectedIndex: React.Dispatch<React.SetStateAction<null | number>>;
  totalBookLength: number;
}) {
  const handleChangeInput = (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    setSelectedIndex(null);
    setSearch(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // TODO: enter(form 적용)와 esc(검색창 제거) 처리
    e.preventDefault();

    if (e.key === "ArrowDown") {
      setSelectedIndex((prev) => {
        if (isNull(prev) || prev === totalBookLength - 1) return 0;
        return prev + 1;
      });
    }
    if (e.key === "ArrowUp") {
      setSelectedIndex((prev) => {
        if (isNull(prev) || prev === 0) return totalBookLength - 1;
        return prev - 1;
      });
    }
  };

  return (
    <input
      type="text"
      className="border"
      value={search}
      onChange={handleChangeInput}
      onKeyDown={handleKeyDown}
    />
  );
}

function BookList({
  books,
  selectedIndex,
}: {
  books: Book[] | undefined;
  selectedIndex: null | number;
}) {
  if (!books || books.length === 0) {
    return <div>결과가 없습니다.</div>;
  }

  return (
    <div className="bg-blue-950">
      {books.map((book, index) => {
        const isSelected = selectedIndex === index;

        return (
          <div key={book.isbn} className={isSelected ? "bg-amber-500" : ""}>
            <span>{book.title}</span>
            <span>{book.authors}</span>
            <span>{book.publisher}</span>

            <img src={book.thumbnail} alt="책 사진" />
          </div>
        );
      })}
    </div>
  );
}
