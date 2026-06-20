import type { Prisma } from '@prisma/client';

export type DiaryData = {
  email: string;
  id: number;
  date: string;
  text: string;
  emotion: number;
  Images: {
    id: string;
    src: string;
    order: number | null;
  }[];
  Habits: {
    UserId: number;
    id: number;
    email: string;
    name: string;
    priority: number;
  }[];
  visible: boolean;
};

export type MonthlyDiaryData = {
  date: string;
  visible: boolean;
  emotion: number;
  Habits: { name: string }[];
};

export type CreateDiaryParams = {
  date?: string;
  text: string;
  images: string[];
  emotion: number;
};

export type UpdateDiaryParams = {
  diaryId?: string | null;
  text: string;
  images: string[];
  emotion: number;
};

export type DeleteDiaryParams = {
  id: number;
};

export type IdParams = {
  id: string | number | null | undefined;
};

export type DateParams = {
  date: string;
};

export type MonthParams = {
  month: string;
};

export type ListParams = {
  sort: string;
  search: number;
  limit: number;
  pageParam: number;
  selectedMonth: number;
  selectedYear: number;
};

export type DiaryWithRelations = Prisma.DiaryGetPayload<{
  include: {
    images: true;
    diaryHabits: {
      include: {
        habit: true;
      };
    };
  };
}>;
