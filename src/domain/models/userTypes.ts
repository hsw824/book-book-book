export interface User {
  id: string;
  email: string;
  passwordHash: string | null;
  createdAt: Date;
}
