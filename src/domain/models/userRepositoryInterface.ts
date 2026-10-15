import { type User } from './userTypes';

export interface PrismaUserRepository {
  insert: (email: string) => void;
  findUser(email: string): Promise<User | null>;
}
