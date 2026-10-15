import { type User } from './userTypes';

export interface PrismaUserRepository {
  insert: (email: string) => void;
  findByEmail(email: string): Promise<User | null>;
}
