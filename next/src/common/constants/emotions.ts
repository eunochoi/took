import { StaticImageData } from 'next/image';

import angry from '/public/img/emotion/angry.png';
import anxious from '/public/img/emotion/anxious.png';
import calm from '/public/img/emotion/calm.png';
import confused from '/public/img/emotion/confused.png';
import happy from '/public/img/emotion/happy.png';
import joyful from '/public/img/emotion/joyful.png';
import love from '/public/img/emotion/love.png';
import sad from '/public/img/emotion/sad.png';
import surprised from '/public/img/emotion/surprised.png';
import unknown from '/public/img/emotion/unknown.png';

export interface Emotion {
  id: number;
  name: string;
  nameKr: string;
  src: StaticImageData;
}

// 감정 데이터 (인덱스 = id)
// 순서: 긍정적 감정 → 중립 → 부정적 감정 → 혼란 → ?
export const EMOTIONS: Emotion[] = [
  { id: 0, name: 'happy', nameKr: '행복', src: happy },
  { id: 1, name: 'joyful', nameKr: '기쁨', src: joyful },
  { id: 2, name: 'love', nameKr: '사랑', src: love },
  { id: 3, name: 'calm', nameKr: '평온', src: calm },
  { id: 4, name: 'surprised', nameKr: '놀람', src: surprised },
  { id: 5, name: 'anxious', nameKr: '불안', src: anxious },
  { id: 6, name: 'sad', nameKr: '슬픔', src: sad },
  { id: 7, name: 'angry', nameKr: '화남', src: angry },
  { id: 8, name: 'confused', nameKr: '혼란', src: confused },
  { id: 9, name: 'unknown', nameKr: '모름', src: unknown },
];
