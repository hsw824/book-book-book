'use client';
// TODO: BookSearch 조건부 렌더링에서 컴포넌트로 분리하기
// TODO: 평점도 input label형태로 바꿔보기
import { useForm } from 'react-hook-form';
import { useRecordMutation } from '@/hooks/useRecordMutation';
import toast from 'react-hot-toast';
import { BookRecordForm } from '@/models/recordTypes';
import { SectionTitle } from './SectionTitle';
import { BookSearchField } from './BookSearchField';
import { RatingField } from './RatingField';
import { GenreField } from './GenreField';
import { EbookField } from './EbookField';
import { FinishedAtField } from './FinishedAtField';
import { ReviewField } from './ReviewField';
import { QuotesField } from './QuotesField';

const TODAY_STRING = new Date().toLocaleDateString('sv-SE');

export function Form() {
  const {
    register,
    handleSubmit,
    control,
    formState: { isValid },
    reset,
  } = useForm<BookRecordForm>({
    defaultValues: {
      bookInfo: null,
      finishedAt: TODAY_STRING,
      review: '',
      quotes: [{ page: 0, text: '' }],
      genre: '소설',
      rating: null,
      isEbook: false,
    },
  });

  const { mutateAsync: recordMutateAsync, isPending } = useRecordMutation();

  const onSubmit = (data: BookRecordForm) => {
    try {
      recordMutateAsync(data);
      toast.success('기록이 완료되었어요!');
      reset();
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
      <BookSearchField control={control} />
      <hr className="my-6 h-3 w-full text-gray-100" />
      <SectionTitle title="기록 정보" />
      <GenreField register={register('genre')} />
      <FinishedAtField
        control={control}
        register={register('finishedAt', { required: '다 읽은 날짜를 입력해주세요.' })}
      />
      <RatingField control={control} />
      <ReviewField control={control} register={register('review', { required: '감상을 입력해주세요.' })} />
      <QuotesField control={control} register={register} />
      <EbookField control={control} />
      <button
        type="submit"
        className="we h-12 w-full cursor-pointer rounded-[18px] bg-blue-500 text-[15px] font-semibold text-white disabled:bg-gray-300"
        disabled={!isValid || isPending}
      >
        기록하기
      </button>
    </form>
  );
}
