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
        const foundUser = await prisma.user.findUnique({
          where: { email },
          select: { provider: true },
        });

        if (foundUser && foundUser.provider !== provider) {
          return `/unauthorized?message=${encodeURI('이미 다른 SNS로 가입된 이메일입니다.')}`;
        }

        if (!foundUser) {
          await prisma.user.create({
            data: {
              email,
              provider,
            },
          });
        }

        await setAccessRefreshToken({ email, provider });
        return true;
      } catch (e) {
        console.log(e);
        return `/unauthorized`;
      }
    },
    // async jwt({ token, user, account, profile, isNewUser }) {
    //   return token;
    // }
    // async redirect({ url, baseUrl }) {
    //   console.log(url)
    //   console.log(baseUrl)
    //   return baseUrl
    // },
    // async session({ session, user, token }) {
    //   return session
    // },
  },
  pages: {
    error: '/login',
  }
})
