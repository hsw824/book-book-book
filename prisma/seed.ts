import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

// 인증(Auth.js) 붙이기 전까지 사용할 고정 임시 유저 ID.
// API 핸들러에서도 이 값을 그대로 참조합니다.
export const TEMP_USER_ID = '00000000-0000-0000-0000-000000000001';

async function main() {
  const user = await prisma.user.upsert({
    where: { id: TEMP_USER_ID },
    update: {},
    create: {
      id: TEMP_USER_ID,
      email: 'temp@book-book-book.dev',
      passwordHash: 'temp-not-used-yet',
    },
  });

  console.log('Seeded temp user:', user);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
