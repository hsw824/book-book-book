import { CATEGORIES } from '@/constants/category';
import { FormField } from '../FormField';
import { type UseFormRegisterReturn } from 'react-hook-form';

export function CategoryField({ register }: { register: UseFormRegisterReturn }) {
  return (
    <FormField title="카테고리" isRequired htmlFor="category">
      <select
        id="category"
        className="mb-2 w-full cursor-pointer rounded-[18px] border border-solid border-zinc-200 px-3.25 py-2.75 text-sm outline-none"
        {...register}
      >
        {CATEGORIES.map((category) => (
          <option key={category}>{category}</option>
        ))}
      </select>
    </FormField>
  );
}
