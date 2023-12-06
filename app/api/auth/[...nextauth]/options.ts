import type { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import { authSignin } from "@/service/auth/auth-service";
import CredentialsProvider from "next-auth/providers/credentials";

export const AuthOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await authSignin(credentials?.email, credentials?.password);

        // If no error and we have user data, return it
        if (res.data) {
          return res.data;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  session: { strategy: "jwt" },

  pages: {
    signIn: "/auth/signin",
  },

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.id,
      },
    }),
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }

      return token;
    },
  },
};
