import { prisma } from '@/lib/prisma';

interface User {
  id: string;
  email: string;
  passwordHash: string | null;
  createdAt: Date;
}

export interface PrismaUserRepository {
  insert: (email: string) => void;
  findUser(email: string): Promise<User | null>;
}

class UserRepository implements PrismaUserRepository {
  async insert(email: string) {
    prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        email,
      },
    });
  }

  async findUser(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
    });
  }
}

export const userRepository = new UserRepository();
