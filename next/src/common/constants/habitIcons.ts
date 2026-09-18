import type { IconType } from 'react-icons';
import {
  MdAir, MdAlarm, MdBedtime, MdBook, MdBrush, MdCleaningServices,
  MdCode, MdDirectionsBike, MdDirectionsRun, MdDirectionsWalk, MdEditNote,
  MdFavoriteBorder, MdFitnessCenter, MdFlag, MdInventory2, MdLocalFlorist,
  MdMedication, MdMenuBook, MdMusicNote, MdPalette, MdPhotoCamera,
  MdRestaurant, MdSavings, MdSchool, MdSelfImprovement, MdSoupKitchen,
  MdSportsGymnastics, MdTranslate, MdWaterDrop, MdWeekend,
} from 'react-icons/md';

// DB에는 key만 저장한다. 저장된 key는 아이콘 그림이 바뀌어도 유지한다.
export const HABIT_ICONS = {
  goal: MdFlag,
  walking: MdDirectionsWalk,
  running: MdDirectionsRun,
  strength: MdFitnessCenter,
  stretching: MdSportsGymnastics,
  cycling: MdDirectionsBike,
  water: MdWaterDrop,
  nutrition: MdRestaurant,
  supplements: MdMedication,
  sleep: MdBedtime,
  brushing: MdBrush,
  reading: MdMenuBook,
  studying: MdSchool,
  language: MdTranslate,
  writing: MdEditNote,
  coding: MdCode,
  meditation: MdSelfImprovement,
  breathing: MdAir,
  gratitude: MdFavoriteBorder,
  journaling: MdBook,
  rest: MdWeekend,
  waking: MdAlarm,
  cleaning: MdCleaningServices,
  organizing: MdInventory2,
  cooking: MdSoupKitchen,
  plants: MdLocalFlorist,
  saving: MdSavings,
  music: MdMusicNote,
  drawing: MdPalette,
  photography: MdPhotoCamera,
} as const satisfies Record<string, IconType>;

export type HabitIconKey = keyof typeof HABIT_ICONS;

export const DEFAULT_HABIT_ICON_KEY: HabitIconKey = 'goal';
export const HABIT_ICON_KEYS = Object.keys(HABIT_ICONS) as HabitIconKey[];

export const isValidHabitIconKey = (value: unknown): value is HabitIconKey =>
  typeof value === 'string' && Object.prototype.hasOwnProperty.call(HABIT_ICONS, value);

export const getHabitIconKey = (value: unknown): HabitIconKey =>
  isValidHabitIconKey(value) ? value : DEFAULT_HABIT_ICON_KEY;
