import CryptoJS from 'crypto-js';

import type { AuthResult } from '../../../auth/getAuth';
import { getEnvValue } from '../../../utils/getEnvValue';
import { recomputeUserDiaryStreak } from '../../streak';
import type { ActionResult } from '../../types';
import type { DiaryData, DiaryWithRelations } from '../types';

export const createAuthErrorResult = (error: Extract<AuthResult, { ok: false }>): ActionResult<never> => {
  return {
    ok: false,
    code: error.code,
    message: error.message,
  };
};

export const createServerErrorResult = (): ActionResult<never> => {
  return {
    ok: false,
    code: 'SERVER_ERROR',
    message: '서버 에러가 발생했습니다.',
  };
};

export const validateDateFormat = (dateString: string | undefined) => {
  if (!dateString || typeof dateString !== 'string') return false;

  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) return false;

  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);

  return date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day;
};

export const getMonthRange = (monthString: string) => {
  if (!monthString || !/^\d{4}-\d{2}$/.test(monthString)) {
    throw new Error('Invalid month format. Expected yyyy-MM');
  }

  const [year, month] = monthString.split('-').map(Number);
  const lastDay = new Date(year, month, 0).getDate();

  return {
    startDate: `${year}-${String(month).padStart(2, '0')}-01`,
    endDate: `${year}-${String(month).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`,
  };
};

export const encryptDiaryText = (text: string) => {
  return CryptoJS.AES.encrypt(text, getEnvValue('DATA_SECRET_KEY')).toString();
};

const decryptDiaryText = (text: string) => {
  return CryptoJS.AES.decrypt(text, getEnvValue('DATA_SECRET_KEY')).toString(CryptoJS.enc.Utf8);
};

export const parseDiaryId = (id: string | number | null | undefined) => {
  const diaryId = Number(id);

  if (!id || Number.isNaN(diaryId)) {
    return null;
  }

  return diaryId;
};

export const formatDiaryData = (diary: DiaryWithRelations): DiaryData => {
  return {
    email: diary.email,
    id: diary.id,
    date: diary.date,
    text: decryptDiaryText(diary.text),
    emotion: diary.emotion,
    visible: diary.visible,
    Images: diary.images.map((image) => ({
      id: String(image.id),
      src: image.src,
      order: image.order,
    })),
    Habits: diary.diaryHabits.map(({ habit }) => ({
      UserId: habit.userId,
      id: habit.id,
      email: habit.email,
      name: habit.name,
      priority: habit.priority,
    })),
  };
};

export const recomputeStreak = async (email: string) => {
  await recomputeUserDiaryStreak(email);
};
