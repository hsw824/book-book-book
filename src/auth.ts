import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { UserRepository } from './domain/repositories/userRepository';

const userRepository = new UserRepository();

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user }) {
      if (!user.email) {
        return false;
      }

      await userRepository.insert(user.email);

      return true;
    },
    async jwt({ token }) {
      if (token.email) {
        const dbUser = await userRepository.findUser(token.email);
        if (dbUser) {
          token.userId = dbUser.id;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.userId) {
        session.user.id = token.userId as string;
      }
      return session;
    },
  },
});
