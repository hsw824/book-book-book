import { prisma } from '@/lib/prisma';
import { type PrismaUserRepository } from '../models/userRepositoryInterface';
import { type User } from '../models/userTypes';

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
