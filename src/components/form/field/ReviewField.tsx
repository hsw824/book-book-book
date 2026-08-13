import { Control, UseFormRegisterReturn, useFormState } from 'react-hook-form';
import { FormField } from '../FormField';
import { BookRecordForm } from '@/models/recordTypes';

export function ReviewField({
  control,
  register,
}: {
  control: Control<BookRecordForm>;
  register: UseFormRegisterReturn;
}) {
  const { errors } = useFormState({ control, name: 'review' });

  return (
    <FormField title="감상" isRequired htmlFor="review">
      <textarea
        id="review"
        placeholder="한줄평부터 자세한 감상까지 자유롭게 남겨보세요!"
        className="w-full resize-none rounded-[18px] border border-solid border-zinc-200 px-3.25 py-2.75 text-[14.5px] outline-none"
        {...register}
      />
      {errors.review && <span className="text-sm text-red-600">{errors.review.message}</span>}
    </FormField>
  );
}
