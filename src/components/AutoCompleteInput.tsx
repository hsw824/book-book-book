"use client";

// TODO: 테일윈드 조금 더 정리해보기
// TODO: 컴포넌트 정리(toss lib참고)
// TODO: next img 컴포넌트 써보기
// TODO: infinite use query
// FIXME: 키보드 입력때 e.preventDefault 오류 수정
// FIXME: 책 리스트 나오는거 어떻게 나오는지 클릭시 나오면 안되고 좀 어떻게 해야할지 고민(인풋을 클릭할 때 나오게 했는데 그런 방식 말고 다른 방식을 찾아야할듯)
// FIXME: 키보드 이벤트 할 때 스크롤도 내려가게(구글도 없기는한디)

import { useSearchDebounce } from "@/hooks/useDebounce";
import { Book } from "@/models/bookTypes";
import { bookQueryOption } from "@/queries/bookQuery";
import { useQuery } from "@tanstack/react-query";
import { isNull } from "es-toolkit";
import { useState } from "react";

export function AutoCompleteInput() {
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState<null | number>(null);
  const [isShow, setIsShow] = useState(false);

  const debouncedSearch = useSearchDebounce(search, 400);

  const { data: books } = useQuery(bookQueryOption.books(debouncedSearch));

  return (
    <div className="w-105 rounded-[18px] border border-solid border-zinc-200 p-3.5 my-0 mx-auto">
      <SearchBookInput
        search={search}
        setSearch={setSearch}
        setSelectedIndex={setSelectedIndex}
        totalBookLength={!books ? 0 : books.length}
        setIsShow={setIsShow}
      />
      {isShow && (
        <BookList
          books={books}
          selectedIndex={selectedIndex}
          isShow={isShow}
          search={search}
        />
      )}
    </div>
  );
}

function SearchBookInput({
  search,
  setSearch,
  setSelectedIndex,
  totalBookLength,
  setIsShow,
}: {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setSelectedIndex: React.Dispatch<React.SetStateAction<null | number>>;
  totalBookLength: number;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const handleChangeInput = (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    setSelectedIndex(null);
    setSearch(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // TODO: enter(form 적용)와 esc(검색창 제거) 처리
    // e.preventDefault();

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

  const handleClick = () => {
    setIsShow((prev) => !prev);
  };

  return (
    <div className="flex items-center gap-2.5 h-11 py-0 px-3 rounded-xl border border-solid border-zinc-300 shadow-none">
      <span className="grow-0 shrink-0 basis-auto text-zinc-400">
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
        className="grow shrink basis-[0%] outline-none text-[15px] text-neutral-800"
        value={search}
        onChange={handleChangeInput}
        onKeyDown={handleKeyDown}
        onClick={handleClick}
      />
      <button className="w-5.5 h-5.5 bg-gray-100 border-none text-gray-600 cursor-pointer text-[11px] rounded-[11px]">
        x
      </button>
    </div>
  );
}

function BookList({
  books,
  selectedIndex,
  isShow,
  search,
}: {
  books: Book[] | undefined;
  selectedIndex: null | number;
  isShow: boolean;
  search: string;
}) {
  if (!books) {
    return (
      <div
        className={`${isShow ? "h-150" : "h-25"} flex flex-col justify-center items-center`}
      >
        <span className="mb-2 text-[15px] font-semibold text-gray-600">
          어떤 책을 기록할까요?
        </span>
        <span className="text-[13px] text-zinc-400">
          읽은 책의 제목이나 저자를 입력해 보세요.
        </span>
      </div>
    );
  }

  if (books.length === 0 && search.length !== 0) {
    return (
      <div className="h-150 flex flex-col justify-center items-center">
        <span className="text-zinc-400 opacity-80 mb-1">
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

        <span className="mb-2 text-[15px] font-semibold text-gray-600">
          검색 결과가 없어요.
        </span>
        <span className="text-[13px] text-zinc-400 text-center">
          &apos;{search}&apos;(으)로 찾은 책이 없어요.
          <br /> 다른 제목이나 저자로 검색해 보세요.
        </span>
      </div>
    );
  }

  return (
    <div
      className={`${isShow ? "h-150" : "h-25"} overflow-y-scroll origin-top animate-[dropSpring_0.34s_cubic-bezier(0.34,1.42,0.5,1)] mt-3.5 -mx-3.5`}
    >
      {books.map((book, index) => {
        const isSelected = selectedIndex === index;

        return (
          <div
            key={book.isbn}
            className={`${isSelected ? "bg-indigo-50 shadow-[inset_2px_0_0_var(--color-blue-600)]" : ""} border-t border-solid border-gray-100`}
          >
            <div className="flex py-3 px-4 gap-3 cursor-pointer">
              <img
                className="w-[46px] h-[64px] rounded-[3px]"
                src={book.thumbnail}
                alt="책 사진"
              />
              <div className="flex flex-col justify-start ">
                <span className="text-[15px] font-medium text-neutral-800">
                  {book.title}
                </span>
                <span className="text-[13px]/[1.3] text-gray-600 mt-0.75">
                  {book.authors}
                </span>
                <span className="text-[13px]/[1.3] text-zinc-400 mt-0.5">
                  {book.publisher}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
