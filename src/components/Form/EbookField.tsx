import { BookRecordForm } from '@/models/recordTypes';
import { Control, Controller } from 'react-hook-form';
import { Toggle } from './Toggle';

export function EbookField({ control }: { control: Control<BookRecordForm> }) {
  return (
    <div className="mb-2 flex items-center gap-2">
      <Controller
        control={control}
        name="isEbook"
        render={({ field: { onChange, value } }) => <Toggle toggle={value} setToggle={onChange} />}
      />
      <span className="text-sm"> 이책은 ebook으로 읽었어요</span>
    </div>
  );
}
