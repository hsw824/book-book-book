'use client';

import { type Category } from '@/constants/category';
import { recordsQueryOption } from '@/queries/recordsQuery';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Chip } from './ui/Chip';

export function CategoryFilter({
  value,
  onValueChange,
}: {
  value: Category[];
  onValueChange: (value: Category[]) => void;
}) {
  const { data: categories } = useSuspenseQuery(recordsQueryOption.categories());
  const toggle = (category: Category) => {
    const next = value.includes(category)
      ? value.filter((item) => item !== category)
      : categories.filter((item) => item === category || value.includes(item));

    onValueChange(next);
  };

  return (
    <div className="mb-6 flex flex-wrap gap-2 border-b border-zinc-300 pb-5" role="group" aria-label="카테고리 필터">
      {categories.map((category) => (
        <Chip key={category} label={category} isActive={value.includes(category)} onClick={() => toggle(category)} />
      ))}
    </div>
  );
}
