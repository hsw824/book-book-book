'use client';
// TODO: BookSearch 조건부 렌더링에서 컴포넌트로 분리하기
// TODO: 평점도 input label형태로 바꿔보기

import { useState } from 'react';
import { AutoCompleteInput } from './AutoCompleteInput';
import { isNull } from 'es-toolkit';
import { Toggle } from './Toggle';
import { Book } from '@/models/bookTypes';
import Image from 'next/image';
import { Control, Controller, useFieldArray, useForm, useFormState } from 'react-hook-form';
import { useRecordMutation, useUpdateRecordMutation } from '@/hooks/useRecordMutation';
import toast from 'react-hot-toast';
import { Rating, RATINGS } from '@/constant/rate';
import { Genre, GENRES } from '@/constant/genre';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';

const RATING_TEXTS = ['별로예요', '아쉬워요', '보통이에요', '좋아요', '최고예요'];

export type BookForm = {
  bookInfo: Book | null;
  finishedAt: string;
  review: string;
  quotes: {
    page: number;
    text: string;
  }[];
  genre: Genre;
  rating: Rating | null;
  isEbook: boolean;
};

export function Form({ editFormData, mode, id }: { editFormData?: BookForm; mode: 'create' | 'edit'; id?: string }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    reset,
  } = useForm<BookForm>({
    defaultValues: editFormData
      ? editFormData
      : {
          bookInfo: null,
          finishedAt: format(new Date(), 'yyyy-MM-dd'),
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

  const { mutateAsync: createRecordMutateAsync, isPending: isCreatePending } = useRecordMutation();
  const { mutateAsync: editRecordMutateAsync, isPending: isEditPending } = useUpdateRecordMutation();

  const onSubmit = async (data: BookForm) => {
    if (mode === 'create') {
      try {
        await createRecordMutateAsync(data);
        toast.success('기록이 완료되었어요!');
        reset();
      } catch {
        toast.error('오류가 발생했어요. 다시 시도해 주세요.');
      }
      return;
    }

    try {
      if (!id) throw new Error('잘못된 접근입니다.');
      await editRecordMutateAsync({ id, data });
      toast.success('수정이 완료되었어요!');
      router.push(`/records/${id}`);
    } catch {
      toast.error('오류가 발생했어요. 다시 시도해 주세요.');
    }
  };

  return (
    <form
      className="mx-auto h-300 w-200 rounded-[18px] border border-solid border-zinc-200 p-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      <SectionTitle title="책 정보" />
      <BookSearch control={control} isEdit={mode === 'edit'} />
      <hr className="my-6 h-3 w-full text-gray-100" />

      <SectionTitle title="기록 정보" />
      <FormField title="장르" isRequired htmlFor="genres">
        <select
          id="genres"
          className="mb-2 w-full cursor-pointer rounded-[18px] border border-solid border-zinc-200 px-3.25 py-2.75 text-sm outline-none"
          {...register('genre')}
        >
          {GENRES.map(genre => (
            <option key={genre}>{genre}</option>
          ))}
        </select>
      </FormField>

      <FormField title="다 읽은 날짜" isRequired htmlFor="finishedAt">
        <input
          id="finishedAt"
          type="date"
          className="mb-2 w-full cursor-pointer rounded-[18px] border border-solid border-zinc-200 px-3.25 py-2.75 text-sm outline-none"
          {...register('finishedAt', { required: '다 읽은 날짜를 입력해주세요.' })}
        />
        {errors.finishedAt && <span className="text-sm text-red-600">{errors.finishedAt.message}</span>}
      </FormField>

      <RatingFiled control={control} />

      <FormField title="감상" isRequired htmlFor="review">
        <textarea
          id="review"
          placeholder="한줄평부터 자세한 감상까지 자유롭게 남겨보세요!"
          className="w-full resize-none rounded-[18px] border border-solid border-zinc-200 px-3.25 py-2.75 text-[14.5px] outline-none"
          {...register('review', { required: '감상을 입력해주세요.' })}
        />
        {errors.review && <span className="text-sm text-red-600">{errors.review.message}</span>}
      </FormField>

      <FormField title="필사하고 싶은 구절">
        {fields.map((filed, index) => (
          <div key={filed.id} className="mb-2 flex rounded-[18px] border border-solid border-zinc-200">
            <p className="flex basis-[4%] items-center justify-center text-[12px] text-neutral-800">P.</p>
            <input
              className="basis-[6%] border-r border-zinc-200 p-2 text-[12px] text-neutral-800 outline-none"
              type="number"
              {...register(`quotes.${index}.page`, { valueAsNumber: true })}
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
      </FormField>

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
        className="we h-12 w-full cursor-pointer rounded-[18px] bg-blue-500 text-[15px] font-semibold text-white disabled:bg-gray-300"
        disabled={!isValid || isCreatePending || isEditPending}
      >
        {mode === 'create' ? '기록하기' : '수정하기'}
      </button>
    </form>
  );
}

function SectionTitle({ title }: { title: string }) {
  return <p className="mb-4 font-semibold text-zinc-400">{title}</p>;
}

function FormField({
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

function BookSearch({ control, isEdit }: { control: Control<BookForm>; isEdit: boolean }) {
  const { errors } = useFormState({ control, name: 'bookInfo' });

  return (
    <FormField title="책 검색" isRequired>
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
                  {value.publisher} · {value.datetime}
                </span>
              </div>
              <button
                type="button"
                className="cursor-pointer rounded-2xl bg-white px-3 py-1.5 text-[12px] text-gray-600 disabled:bg-zinc-200 disabled:text-zinc-200"
                onClick={() => onChange(null)}
                disabled={isEdit}
              >
                변경
              </button>
            </div>
          ) : (
            <AutoCompleteInput onChange={onChange} />
          );
        }}
        rules={{ required: '읽은 책을 입력해 주세요.' }}
      />

      {errors.bookInfo && <span className="text-sm text-red-600">{errors.bookInfo.message}</span>}
    </FormField>
  );
}

function RatingFiled({ control }: { control: Control<BookForm> }) {
  const { errors } = useFormState({ control, name: 'rating' });
  const [hoverRating, setHoverRating] = useState<null | Rating>(null);

  return (
    <FormField title="평점" isRequired>
      <Controller
        control={control}
        name="rating"
        rules={{ required: '평점을 기록해 보세요.' }}
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
      {errors.rating && <span className="text-sm text-red-600">{errors.rating.message}</span>}
    </FormField>
  );
}
