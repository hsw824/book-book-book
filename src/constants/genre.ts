export const GENRES = [
  '소설',
  '시·희곡',
  '에세이·산문',
  '인문·철학',
  '사회·정치',
  '역사',
  '과학·기술',
  '경제·경영',
  '자기계발',
  '예술·대중문화',
  '종교',
  '기타',
] as const;

export type Genre = (typeof GENRES)[number];
