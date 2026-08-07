import { Control, UseFormRegisterReturn, useFormState } from 'react-hook-form';
import { FormField } from '../FormField';
import { BookRecordForm } from '@/models/recordTypes';

export function FinishedAtField({
  control,
  register,
}: {
  control: Control<BookRecordForm>;
  register: UseFormRegisterReturn;
}) {
  const { errors } = useFormState({ control, name: 'finishedAt' });

  return (
    <FormField title="다 읽은 날짜" isRequired htmlFor="finishedAt">
      <input
        id="finishedAt"
        type="date"
        className="mb-2 w-full cursor-pointer rounded-[18px] border border-solid border-zinc-200 px-3.25 py-2.75 text-sm outline-none"
        {...register}
      />
      {errors.finishedAt && <span className="text-sm text-red-600">{errors.finishedAt.message}</span>}
    </FormField>
  );
}
