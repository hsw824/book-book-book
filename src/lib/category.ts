import { Category } from '@/generated/prisma';

export const CATEGORY_LABEL_TO_ENUM: Record<string, Category> = {
  소설: Category.NOVEL,
  '시·희곡': Category.POETRY_DRAMA,
  '에세이·산문': Category.ESSAY,
  '인문·철학': Category.HUMANITIES,
  '사회·정치': Category.SOCIETY,
  역사: Category.HISTORY,
  '과학·기술': Category.SCIENCE_TECH,
  '경제·경영': Category.ECONOMY_BUSINESS,
  자기계발: Category.SELF_HELP,
  '예술·대중문화': Category.ART_CULTURE,
  종교: Category.RELIGION,
  기타: Category.ETC,
};
