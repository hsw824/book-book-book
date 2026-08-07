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

export const GENRE_MAP: Record<string, Genre> = {
  NOVEL: '소설',
  POETRY_DRAMA: '시·희곡',
  ESSAY: '에세이·산문',
  HUMANITIES: '인문·철학',
  SOCIETY: '사회·정치',
  HISTORY: '역사',
  SCIENCE_TECH: '과학·기술',
  ECONOMY_BUSINESS: '경제·경영',
  SELF_HELP: '자기계발',
  ART_CULTURE: '예술·대중문화',
  RELIGION: '종교',
  ETC: '기타',
};
