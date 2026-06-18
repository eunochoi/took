'use server'

import { prisma } from '../../../lib/prisma'
import { clearAccessRefreshToken } from '../auth/token'
import { getAuth, type AuthResult } from '../auth/getAuth'
import type { ActionResult } from './types'

export type CurrentUser = {
  id: number
  email: string
  provider: string
  currentStreakDays: number | null
  longestStreakDays: number | null
  createdAt: Date
}

const createAuthErrorResult = (error: Extract<AuthResult, { ok: false }>): ActionResult<never> => {
  return {
    ok: false,
    code: error.code,
    message: error.message,
  }
}

const createServerErrorResult = (): ActionResult<never> => {
  return {
    ok: false,
    code: 'SERVER_ERROR',
    message: '서버 에러가 발생했습니다.',
  }
}

export const getCurrentUser = async (): Promise<ActionResult<CurrentUser>> => {
  try {
    const auth = await getAuth()
    if (!auth.ok) return createAuthErrorResult(auth)

    const user = await prisma.user.findUnique({
      where: { email: auth.email },
      select: {
        id: true,
        email: true,
        provider: true,
        currentStreakDays: true,
        longestStreakDays: true,
        createdAt: true,
      },
    })

    if (!user) {
      return {
        ok: false,
        code: 'USER_NOT_FOUND',
        message: '유저를 찾을 수 없습니다.',
      }
    }

    return { ok: true, data: user }
  } catch (error) {
    console.error(error)
    return createServerErrorResult()
  }
}

export const logout = async (): Promise<ActionResult<string>> => {
  await clearAccessRefreshToken()
  return { ok: true, data: '로그아웃 완료' }
}

export const deleteCurrentUser = async (): Promise<ActionResult<string>> => {
  try {
    const auth = await getAuth()
    if (!auth.ok) return createAuthErrorResult(auth)

    await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: { email: auth.email },
        select: { id: true },
      })

      if (!user) {
        throw new Error('USER_NOT_FOUND')
      }

      const diaries = await tx.diary.findMany({
        where: { userId: user.id },
        select: { id: true },
      })
      const diaryIds = diaries.map((diary) => diary.id)

      if (diaryIds.length > 0) {
        await tx.image.deleteMany({
          where: { diaryId: { in: diaryIds } },
        })
        await tx.diaryHabit.deleteMany({
          where: { diaryId: { in: diaryIds } },
        })
      }

      await tx.diary.deleteMany({
        where: { userId: user.id },
      })
      await tx.habit.deleteMany({
        where: { userId: user.id },
      })
      await tx.user.delete({
        where: { id: user.id },
      })
    })

    await clearAccessRefreshToken()
    return { ok: true, data: '탈퇴가 완료되었습니다.' }
  } catch (error) {
    if (error instanceof Error && error.message === 'USER_NOT_FOUND') {
      return {
        ok: false,
        code: 'USER_NOT_FOUND',
        message: '존재하지 않는 유저입니다.',
      }
    }
    console.error(error)
    return createServerErrorResult()
  }
}
