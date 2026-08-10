import { BookRecordForm } from '@/models/recordTypes';
import { Control, Controller, useFormState } from 'react-hook-form';
import Image from 'next/image';
import { SummaryBook } from '@/models/bookTypes';
import { FormField } from '../FormField';
import { AutoCompleteBook } from '@/components/autoComplete/AutoCompleteBook';

interface Props {
  control: Control<BookRecordForm>;
  isEdit: boolean;
}

export function BookSearchField({ control, isEdit }: Props) {
  const { errors } = useFormState({ control, name: 'bookInfo' });

  return (
    <FormField title="책 검색" isRequired>
      <Controller
        control={control}
        name="bookInfo"
        render={({ field: { onChange, value } }) => {
          return value ? (
            <SelectedBookContent value={value} onChange={onChange} isEdit={isEdit} />
          ) : (
            <AutoCompleteBook onChange={onChange} />
          );
        }}
        rules={{ required: '읽은 책을 입력해 주세요.' }}
      />

      {errors.bookInfo && <span className="text-sm text-red-600">{errors.bookInfo.message}</span>}
    </FormField>
  );
}

function SelectedBookContent({
  value,
  onChange,
  isEdit,
}: {
  value: SummaryBook;
  onChange: (...event: null[]) => void;
  isEdit: boolean;
}) {
  return (
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
  );
}
