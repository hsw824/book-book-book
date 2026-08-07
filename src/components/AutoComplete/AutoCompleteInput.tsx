import { isNull } from 'es-toolkit';
import { Glasses } from '../icons/Glasses';

interface Props {
  keyword: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  setSelectedIndex: React.Dispatch<React.SetStateAction<null | number>>;
  bookCount: number;
  onFocus: () => void;
  onBlur: () => void;
}

export function BookSearchInput({ keyword, setKeyword, setSelectedIndex, bookCount, onFocus, onBlur }: Props) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    setSelectedIndex(null);
    setKeyword(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // TODO: enter(form 적용)와 esc(검색창 제거) 처리
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => {
        if (isNull(prev) || prev === bookCount - 1) return 0;
        return prev + 1;
      });
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => {
        if (isNull(prev) || prev === 0) return bookCount - 1;
        return prev - 1;
      });
    }
  };

  const handleRemoveButton = () => {
    setKeyword('');
  };

  return (
    <div className="flex h-11 items-center gap-2.5 rounded-xl border border-solid border-zinc-300 px-3 py-0 shadow-none">
      <span className="shrink-0 grow-0 basis-auto text-zinc-400">
        <Glasses width="17" height="17" strokeWidth="2" />
      </span>
      <input
        placeholder="제목, 저자 검색"
        type="text"
        className="shrink grow basis-[0%] text-[15px] text-neutral-800 outline-none"
        value={keyword}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <button
        type="button"
        className="h-5.5 w-5.5 cursor-pointer rounded-[11px] border-none bg-gray-100 text-[11px] text-gray-600"
        onClick={handleRemoveButton}
      >
        x
      </button>
    </div>
  );
}
