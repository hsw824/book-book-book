import { Genre } from '@/generated/prisma';

export const GENRE_LABEL_TO_ENUM: Record<string, Genre> = {
  소설: Genre.NOVEL,
  '시·희곡': Genre.POETRY_DRAMA,
  '에세이·산문': Genre.ESSAY,
  '인문·철학': Genre.HUMANITIES,
  '사회·정치': Genre.SOCIETY,
  역사: Genre.HISTORY,
  '과학·기술': Genre.SCIENCE_TECH,
  '경제·경영': Genre.ECONOMY_BUSINESS,
  자기계발: Genre.SELF_HELP,
  '예술·대중문화': Genre.ART_CULTURE,
  종교: Genre.RELIGION,
  기타: Genre.ETC,
};
