import { GENRES } from '@/constants/genre';
import { FormField } from '../FormField';
import { UseFormRegisterReturn } from 'react-hook-form';

export function GenreField({ register }: { register: UseFormRegisterReturn }) {
  return (
    <FormField title="장르" isRequired htmlFor="genres">
      <select
        id="genres"
        className="mb-2 w-full cursor-pointer rounded-[18px] border border-solid border-zinc-200 px-3.25 py-2.75 text-sm outline-none"
        {...register}
      >
        {GENRES.map(genre => (
          <option key={genre}>{genre}</option>
        ))}
      </select>
    </FormField>
  );
}
