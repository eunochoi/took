'use client'

import { signOut } from 'next-auth/react'

import { logout as logoutAction } from '@/common/actions/user'

// 서비스 로그아웃과 NextAuth 세션 정리 후 로그인 화면으로 이동
export const logout = async () => {
  const result = await logoutAction()

  if (!result.ok) {
    throw new Error(result.message)
  }

  await signOut({ redirect: false })
  window.location.replace('/login')
}