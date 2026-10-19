'use client';

import { type Genre } from '@/constants/genre';
import { recordsQueryOption } from '@/queries/recordsQuery';
import { useSuspenseQuery } from '@tanstack/react-query';

export function CategoryFilter({ selected, onChange }: { selected: Genre[]; onChange: (selected: Genre[]) => void }) {
  const { data: categories } = useSuspenseQuery(recordsQueryOption.categories());
  const isAll = selected.length === 0;

  const toggle = (category: Genre) => {
    const next = selected.includes(category)
      ? selected.filter((item) => item !== category)
      : categories.filter((item) => item === category || selected.includes(item));

    onChange(next.length === categories.length ? [] : next);
  };

  return (
    <div className="mb-6 flex flex-wrap gap-2 border-b border-zinc-300 pb-5" role="group" aria-label="카테고리 필터">
      <Chip label="전체" isActive={isAll} onClick={() => onChange([])} />
      {categories.map((category) => (
        <Chip
          key={category}
          label={category}
          isActive={!isAll && selected.includes(category)}
          onClick={() => toggle(category)}
        />
      ))}
    </div>
  );
}

function Chip({ label, isActive, onClick }: { label: string; isActive: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={isActive}
      className={`h-10 cursor-pointer rounded-full border px-4.5 text-[15px] transition-colors duration-100 ease-in ${
        isActive
          ? 'border-blue-600 bg-blue-600/10 font-bold text-blue-600'
          : 'border-zinc-200 bg-white font-medium text-gray-600 hover:border-zinc-300'
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
