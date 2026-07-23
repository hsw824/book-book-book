'use client';
// TODO: BookSearch 조건부 렌더링에서 컴포넌트로 분리하기
// TODO: 평점도 input label형태로 바꿔보기

import { useState } from 'react';
import { AutoCompleteInput } from './AutoCompleteInput';
import { isNull } from 'es-toolkit';
import { Toggle } from './Toggle';
import { Book } from '@/models/bookTypes';
import Image from 'next/image';
import { Control, Controller, FieldErrors, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';

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
] as const;

type Genre = (typeof GENRES)[number];

const RATINGS = [1, 2, 3, 4, 5] as const;
type Rating = (typeof RATINGS)[number];
const RATING_TEXTS = ['별로예요', '아쉬워요', '보통이에요', '좋아요', '최고예요'];

type BookForm = {
  bookInfo: Book | null;
  date: string;
  review: string;
  quotes: {
    page: number;
    text: string;
  }[];
  genre: Genre;
  rating: Rating | null;
  isEbook: boolean;
};

const TODAY_STRING = new Date().toLocaleDateString('sv-SE');

export function Form() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<BookForm>({
    defaultValues: {
      bookInfo: null,
      date: TODAY_STRING,
      review: '',
      quotes: [{ page: 0, text: '' }],
      genre: '소설',
      rating: null,
      isEbook: false,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'quotes',
  });

  const onSubmit: SubmitHandler<BookForm> = data => {
    console.log(errors);
    console.log(data);
  };

  return (
    <form
      className="mx-auto h-300 w-200 rounded-[18px] border border-solid border-zinc-200 p-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      <SectionTitle title="책 정보" />
      <BookSearch control={control} errors={errors} />
      <hr className="my-6 h-3 w-full text-gray-100" />

      <SectionTitle title="기록 정보" />
      <FormFiled title="장르" isRequired htmlFor="genres">
        <select
          id="genres"
          className="mb-2 w-full cursor-pointer rounded-[18px] border border-solid border-zinc-200 px-3.25 py-2.75 text-sm outline-none"
          {...register('genre')}
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
          {...register('date', { required: true })}
        />
        {errors.date && <span className="text-sm text-red-600">다 읽은 날짜를 입력해주세요.</span>}
      </FormFiled>

      <RatingFiled control={control} errors={errors} />

      <FormFiled title="감상" isRequired htmlFor="review">
        <textarea
          id="review"
          placeholder="한줄평부터 자세한 감상까지 자유롭게 남겨보세요!"
          className="w-full resize-none rounded-[18px] border border-solid border-zinc-200 px-3.25 py-2.75 text-[14.5px] outline-none"
          {...register('review', { required: true })}
        />
        {errors.review && <span className="text-sm text-red-600">감상을 입력해주세요.</span>}
      </FormFiled>

      <FormFiled title="필사하고 싶은 구절">
        {fields.map((filed, index) => (
          <div key={filed.id} className="mb-2 flex rounded-[18px] border border-solid border-zinc-200">
            <p className="flex basis-[4%] items-center justify-center text-[12px] text-neutral-800">P.</p>
            <input
              className="basis-[6%] border-r border-zinc-200 p-2 text-[12px] text-neutral-800 outline-none"
              type="number"
              {...register(`quotes.${index}.page`)}
            />
            <textarea
              className={`${fields.length > 1 ? 'basis-[85%] border-r border-zinc-200' : 'basis-[90%]'} resize-none p-2 text-sm outline-none`}
              placeholder="마음에 남는 문장을 옮겨보세요"
              {...register(`quotes.${index}.text`)}
            />
            {fields.length > 1 && (
              <button
                className="flex basis-[5%] cursor-pointer items-center justify-center text-neutral-800"
                onClick={() => remove(index)}
                type="button"
              >
                x
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={() => append({ text: '', page: 0 })} className="mb-2 cursor-pointer">
          <p className="text-[13px] text-blue-600">
            <span>+</span> 구절 추가
          </p>
        </button>
      </FormFiled>

      <div className="mb-2 flex items-center gap-2">
        <Controller
          control={control}
          name="isEbook"
          render={({ field: { onChange, value } }) => <Toggle toggle={value} setToggle={onChange} />}
        />
        <span className="text-sm"> 이책은 ebook으로 읽었어요</span>
      </div>

      <button
        type="submit"
        className="we h-12 w-full cursor-pointer rounded-[18px] bg-blue-500 text-[15px] font-semibold text-white"
      >
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

function BookSearch({ control, errors }: { control: Control<BookForm>; errors: FieldErrors<BookForm> }) {
  return (
    <FormFiled title="책 검색" isRequired>
      <Controller
        control={control}
        name="bookInfo"
        render={({ field: { onChange, value } }) => {
          return value ? (
            <div className="flex items-start gap-3.5 rounded-xl bg-zinc-200 px-4 py-3.5">
              <Image src={value.thumbnail} alt="책 사진" width={46} height={64} className="rounded-[3px]" />
              <div className="items-between flex basis-[82%] flex-col">
                <span className="text-[15px] font-semibold">{value.title}</span>
                <span className="text-[12px]">{value.authors}</span>
                <span className="text-[12px]">
                  {value.publisher} · {new Date(value.datetime).getFullYear()}
                </span>
              </div>
              <button
                type="button"
                className="cursor-pointer rounded-2xl bg-white px-3 py-1.5 text-[12px] text-gray-600"
                onClick={() => onChange(null)}
              >
                변경
              </button>
            </div>
          ) : (
            <AutoCompleteInput onChange={onChange} />
          );
        }}
        rules={{ required: true }}
      />

      {errors.bookInfo && <span className="text-sm text-red-600">읽은 책을 입력해 주세요.</span>}
    </FormFiled>
  );
}

function RatingFiled({ control, errors }: { control: Control<BookForm>; errors: FieldErrors<BookForm> }) {
  const [hoverRating, setHoverRating] = useState<null | Rating>(null);

  return (
    <FormFiled title="평점" isRequired>
      <Controller
        control={control}
        name="rating"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => {
          const displayRating = isNull(hoverRating) ? value : hoverRating;

          return (
            <div className="mb-2 flex items-center gap-1.5">
              {RATINGS.map(rate => (
                <span
                  key={rate}
                  className={`cursor-pointer transition-all duration-200 ease-in ${!isNull(displayRating) && rate <= displayRating ? 'text-blue-600' : 'text-zinc-300'}`}
                  onClick={() => onChange(rate)}
                  onMouseEnter={() => setHoverRating(rate)}
                  onMouseLeave={() => setHoverRating(null)}
                >
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                  </svg>
                </span>
              ))}
              <span className="ml-3.5 text-[13px] text-gray-600">
                {displayRating && RATING_TEXTS[displayRating - 1]}
              </span>
            </div>
          );
        }}
      />
      {errors.rating && <span className="text-sm text-red-600">평점을 기록해 보세요.</span>}
    </FormFiled>
  );
}
