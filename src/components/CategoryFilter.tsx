'use client';

import { type Category } from '@/constants/category';
import { recordsQueryOption } from '@/queries/recordsQuery';
import { useSuspenseQuery } from '@tanstack/react-query';

export function CategoryFilter({
  value,
  onValueChange,
}: {
  value: Category[];
  onValueChange: (value: Category[]) => void;
}) {
  const { data: categories } = useSuspenseQuery(recordsQueryOption.categories());
  const isAllSelected = value.length === 0;

  const toggle = (category: Category) => {
    const next = value.includes(category)
      ? value.filter((item) => item !== category)
      : categories.filter((item) => item === category || value.includes(item));

    onValueChange(next.length === categories.length ? [] : next);
  };

  return (
    <div className="mb-6 flex flex-wrap gap-2 border-b border-zinc-300 pb-5" role="group" aria-label="카테고리 필터">
      <Chip label="전체" isActive={isAllSelected} onClick={() => onValueChange([])} />
      {categories.map((category) => (
        <Chip
          key={category}
          label={category}
          isActive={!isAllSelected && value.includes(category)}
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
