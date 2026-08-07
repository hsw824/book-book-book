'use client';
// TODO: BookSearch 조건부 렌더링에서 컴포넌트로 분리하기
// TODO: 평점도 input label형태로 바꿔보기
import { useForm } from 'react-hook-form';
import { useCreateRecordMutation, useUpdateRecordMutation } from '@/hooks/useRecordMutation';
import toast from 'react-hot-toast';
import { BookRecordForm } from '@/models/recordTypes';
import { SectionTitle } from './SectionTitle';
import { BookSearchField } from './field/BookSearchField';
import { RatingField } from './field/RatingField';
import { GenreField } from './field/GenreField';
import { EbookField } from './field/EbookField';
import { FinishedAtField } from './field/FinishedAtField';
import { ReviewField } from './field/ReviewField';
import { QuotesField } from './field/QuotesField';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { ROUTE } from '@/constant/path';
import Link from 'next/link';

interface Props {
  editFormData?: BookRecordForm;
  mode: 'create' | 'edit';
  id?: string;
}

const defaultEditFormData: BookRecordForm = {
  bookInfo: null,
  finishedAt: format(new Date(), 'yyyy-MM-dd'),
  review: '',
  quotes: [{ page: 0, text: '' }],
  genre: '소설',
  rating: null,
  isEbook: false,
};

export function RecordForm({ editFormData, mode, id }: Props) {
  const {
    register,
    handleSubmit,
    control,
    formState: { isValid },
    reset,
  } = useForm<BookRecordForm>({
    defaultValues: editFormData ? editFormData : defaultEditFormData,
  });

  const router = useRouter();

  const { mutateAsync: createRecordMutateAsync, isPending: isCreatePending } = useCreateRecordMutation();
  const { mutateAsync: editRecordMutateAsync, isPending: isEditPending } = useUpdateRecordMutation();

  const onSubmit = async (data: BookRecordForm) => {
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

  const moveToHref = mode === 'create' ? ROUTE.HOME : `/records/${id}`;

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-stone-200">
      <form
        className="h-220 w-150 overflow-auto rounded-[18px] border border-solid border-zinc-200 bg-white px-10 py-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Link className="mb-2 cursor-pointer text-sm text-gray-600" href={moveToHref}>
          &lt; 뒤로가기
        </Link>
        <SectionTitle title="책 정보" />
        <BookSearchField control={control} isEdit={mode === 'edit'} />
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
          className="h-12 w-full cursor-pointer rounded-[18px] bg-blue-500 text-[15px] font-semibold text-white disabled:bg-gray-300"
          disabled={!isValid || isCreatePending || isEditPending}
        >
          {mode === 'create' ? '기록하기' : '수정하기'}
        </button>
      </form>
    </div>
  );
}
