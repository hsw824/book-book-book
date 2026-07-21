'use client';

import { ChangeEvent, useState } from 'react';
import { AutoCompleteInput } from './AutoCompleteInput';
import { isNull } from 'es-toolkit';
import { Toggle } from './Toggle';

const GENRES = [
  '소설',
  '시·희곡',
  '에세이·산문',
  '인문·철학',
  '사회·정치',
  '역사',
  '과학·기술',
  '경제·경영',
  '자기계발',
  '예술·대중문화',
  '종교',
  '기타',
];

const RATINGS = [1, 2, 3, 4, 5] as const;
const RATING_TEXTS = ['별로예요', '아쉬워요', '보통이에요', '좋아요', '최고예요'];

export function Form() {
  const [rating, setRating] = useState<null | 1 | 2 | 3 | 4 | 5>(null);
  const [hoverRating, setHoverRating] = useState<null | 1 | 2 | 3 | 4 | 5>(null);
  const [quotes, setQuotes] = useState([{ page: '', text: '', id: 0 }]);
  const [isEbook, setIsEbook] = useState(false);

  const displayRating = isNull(hoverRating) ? rating : hoverRating;

  const handleQuoteDelete = (id: number) => {
    setQuotes(quotes.filter(quote => quote.id !== id));
  };

  const handleQuoteAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setQuotes([...quotes, { id: new Date().getMilliseconds(), text: '', page: '' }]);
  };

  const handlePageModify = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>, id: number) => {
    const modifiedQuote = quotes.map(quote => {
      if (quote.id === id) return { ...quote, page: e.target.value };
      return quote;
    });
    setQuotes(modifiedQuote);
  };

  const handleTextModify = (e: ChangeEvent<HTMLTextAreaElement, HTMLTextAreaElement>, id: number) => {
    const modifiedQuote = quotes.map(quote => {
      if (quote.id === id) return { ...quote, text: e.target.value };
      return quote;
    });
    setQuotes(modifiedQuote);
  };

  return (
    <form className="mx-auto h-300 w-200 rounded-[18px] border border-solid border-zinc-200 p-10">
      <SectionTitle title="책 정보" />
      <FormFiled title="책 검색" isRequired>
        <AutoCompleteInput />
      </FormFiled>
      <hr className="my-6 h-3 w-full text-gray-100" />

      <SectionTitle title="기록 정보" />
      <FormFiled title="장르" isRequired htmlFor="genres">
        <select
          id="genres"
          className="mb-2 w-full cursor-pointer rounded-[18px] border border-solid border-zinc-200 px-3.25 py-2.75 text-sm outline-none"
        >
          {GENRES.map(genre => (
            <option key={genre}>{genre}</option>
          ))}
        </select>
      </FormFiled>

      <FormFiled title="다 읽은 날짜" isRequired htmlFor="finishedAt">
        <input
          id="finishedAt"
          type="date"
          className="mb-2 w-full cursor-pointer rounded-[18px] border border-solid border-zinc-200 px-3.25 py-2.75 text-sm outline-none"
        />
      </FormFiled>

      <FormFiled title="평점" isRequired>
        <div className="mb-2 flex items-center gap-1.5">
          {RATINGS.map(rate => (
            <span
              key={rate}
              className={`cursor-pointer ${!isNull(displayRating) && rate <= displayRating ? 'text-blue-600' : 'text-zinc-300'}`}
              onClick={() => setRating(rate)}
              onMouseEnter={() => setHoverRating(rate)}
              onMouseLeave={() => setHoverRating(null)}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
              </svg>
            </span>
          ))}
          <span className="ml-3.5 text-[13px] text-gray-600">{displayRating && RATING_TEXTS[displayRating - 1]}</span>
        </div>
      </FormFiled>

      <FormFiled title="감상" isRequired htmlFor="review">
        <textarea
          id="review"
          placeholder="한줄평부터 자세한 감상까지 자유롭게 남겨보세요!"
          className="mb-2 w-full resize-none rounded-[18px] border border-solid border-zinc-200 px-3.25 py-2.75 text-[14.5px] outline-none"
        />
      </FormFiled>

      <FormFiled title="필사하고 싶은 구절">
        {quotes.map(quote => (
          <div key={quote.id} className="mb-2 flex rounded-[18px] border border-solid border-zinc-200">
            <p className="flex basis-[4%] items-center justify-center text-[12px] text-neutral-800">P.</p>
            <input
              className="basis-[6%] border-r border-zinc-200 p-2 text-[12px] text-neutral-800 outline-none"
              type="number"
              value={quote.page}
              onChange={e => handlePageModify(e, quote.id)}
            />
            <textarea
              className={`${quotes.length > 1 ? 'basis-[85%] border-r border-zinc-200' : 'basis-[90%]'} resize-none p-2 text-sm outline-none`}
              value={quote.text}
              onChange={e => handleTextModify(e, quote.id)}
              placeholder="마음에 남는 문장을 옮겨보세요"
            />
            {quotes.length > 1 && (
              <button
                className="flex basis-[5%] cursor-pointer items-center justify-center text-neutral-800"
                onClick={() => handleQuoteDelete(quote.id)}
              >
                x
              </button>
            )}
          </div>
        ))}
        <button onClick={handleQuoteAdd} className="mb-2 cursor-pointer">
          <p className="text-[13px] text-blue-600">
            <span>+</span> 구절 추가
          </p>
        </button>
      </FormFiled>

      <div className="mb-2 flex items-center gap-2">
        <Toggle toggle={isEbook} setToggle={() => setIsEbook(prev => !prev)} />
        <span className="text-sm"> 이책은 ebook으로 읽었어요</span>
      </div>

      <button className="we h-12 w-full cursor-pointer rounded-[18px] bg-blue-500 text-[15px] font-semibold text-white">
        기록하기
      </button>
    </form>
  );
}

function SectionTitle({ title }: { title: string }) {
  return <p className="mb-4 font-semibold text-zinc-400">{title}</p>;
}

function FormFiled({
  htmlFor,
  title,
  children,
  isRequired = false,
}: {
  htmlFor?: string;
  title: string;
  children: React.ReactNode;
  isRequired?: boolean;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center gap-2">
        <label htmlFor={htmlFor}>{title}</label>
        {isRequired && <span className="text-red-600">*</span>}
      </div>
      {children}
    </div>
  );
}
