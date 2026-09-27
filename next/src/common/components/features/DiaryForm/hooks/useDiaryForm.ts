import { EMOTION_UNSELECTED } from '@/common/constants/filterDefaults';
import { useState } from 'react';
import type { DiaryImageDraft } from '../types';

export const useDiaryForm = () => {
  const [text, setText] = useState('');
  const [emotion, setEmotion] = useState(EMOTION_UNSELECTED);
  const [diaryImages, setDiaryImages] = useState<DiaryImageDraft[]>([]);

  return {
    text,
    setText,
    emotion,
    setEmotion,
    diaryImages,
    setDiaryImages,
  };
};
