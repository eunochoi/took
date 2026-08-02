import NextAuth from "next-auth"

import Google from "next-auth/providers/google"
import Kakao from "next-auth/providers/kakao"
import Naver from "next-auth/providers/naver"

import { prisma } from "../../../lib/prisma"
import { setAccessRefreshToken } from "./token"


export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [Kakao, Google, Naver],
  session: {
    strategy: 'jwt',
    maxAge: 5 * 24 * 60 * 60, //s not ms
  },
  callbacks: {
    async signIn({ user, account }) {
      const provider = account?.provider;
      const email = user.email;

      if (!email || !provider) {
        return '/unauthorized';
      }

      try {
        let foundUser = await prisma.user.findUnique({
          where: { email },
          select: { id: true, provider: true },
        });

        if (foundUser && foundUser.provider !== provider) {
          return `/unauthorized?message=${encodeURI('이미 다른 SNS로 가입된 이메일입니다.')}`;
        }

        if (!foundUser) {
          foundUser = await prisma.user.create({
            data: {
              email,
              provider,
            },
            select: { id: true, provider: true },
          });
        }
        //crate access, refresh token and refreshSession at db
        await setAccessRefreshToken({
          userId: foundUser.id,
          email,
          provider,
        });
        return true;
      } catch (e) {
        console.error(e);
        return `/unauthorized`;
      }
    },
    // async jwt({ token, user, account, profile, isNewUser }) {
    //   return token;
    // }
    // async session({ session, user, token }) {
    //   return session
    // },
  },
  pages: {
    error: '/login',
  }
})
