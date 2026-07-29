import { StaticImageData } from "next/image";
import googleIcon from '/public/img/loginIcon/google.png';
import kakaoIcon from '/public/img/loginIcon/kakao.png';
import naverIcon from '/public/img/loginIcon/naver.png';

interface LoginProvider {
  id: 'google' | 'kakao' | 'naver',
  content: '구글 계정으로 로그인' | '카카오 계정으로 로그인' | '네이버 계정으로 로그인',
  signInOptions: {
    prompt?: 'consent' | 'select_account',
  },
  bgColor: 'bg-brand-google' | 'bg-brand-kakao' | 'bg-brand-naver';
  textColor: string;
  icon: StaticImageData;
}

export const LOGIN_PROVIDERS: Record<string, LoginProvider> = {
  ['google']: {
    id: 'google',
    content: '구글 계정으로 로그인',
    signInOptions: {
      prompt: 'consent'
    },
    bgColor: 'bg-brand-google',
    textColor: 'text-theme-text-primary',
    icon: googleIcon,
  },
  ['naver']: {
    id: 'naver',
    content: '네이버 계정으로 로그인',
    signInOptions: {
      prompt: 'select_account'
    },
    bgColor: 'bg-brand-naver',
    textColor: 'text-theme-text-on-accent',
    icon: naverIcon,
  },
  ['kakao']: {
    id: 'kakao',
    content: '카카오 계정으로 로그인',
    signInOptions: {
    },
    bgColor: 'bg-brand-kakao',
    textColor: 'text-brand-kakao-text',
    icon: kakaoIcon,
  }
}
