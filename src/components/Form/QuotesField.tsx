import { Control, useFieldArray, UseFormRegister } from 'react-hook-form';
import { FormField } from './FormField';
import { BookRecordForm } from '@/models/recordTypes';

interface Props {
  control: Control<BookRecordForm>;
  register: UseFormRegister<BookRecordForm>;
}

export function QuotesField({ control, register }: Props) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'quotes',
  });

  const isMultiple = fields.length > 1;

  return (
    <FormField title="필사하고 싶은 구절">
      {fields.map((field, index) => (
        <div key={field.id} className="mb-2 flex rounded-[18px] border border-solid border-zinc-200">
          <p className="flex basis-[4%] items-center justify-center text-[12px] text-neutral-800">P.</p>
          <input
            className="basis-[6%] border-r border-zinc-200 p-2 text-[12px] text-neutral-800 outline-none"
            type="number"
            {...register(`quotes.${index}.page`, { valueAsNumber: true })}
          />
          <textarea
            className={`${isMultiple ? 'basis-[85%] border-r border-zinc-200' : 'basis-[90%]'} resize-none p-2 text-sm outline-none`}
            placeholder="마음에 남는 문장을 옮겨보세요"
            {...register(`quotes.${index}.text`)}
          />
          {isMultiple && (
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
      <button type="button" onClick={() => append({ page: 0, text: '' })} className="mb-2 cursor-pointer">
        <p className="text-[13px] text-blue-600">
          <span>+</span> 구절 추가
        </p>
      </button>
    </FormField>
  );
}
