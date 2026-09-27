import type { DiaryImage } from '@/common/types/diary';

export type DiaryImageDraft =
  | Pick<DiaryImage, 'imageContentId' | 'src'>
  | File;
