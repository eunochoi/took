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
  bgColor: 'bg-white' | 'bg-[#fae100]' | 'bg-[#02c73c]';
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
    bgColor: 'bg-white',
    textColor: 'text-grey-title',
    icon: googleIcon,
  },
  ['naver']: {
    id: 'naver',
    content: '네이버 계정으로 로그인',
    signInOptions: {
      prompt: 'select_account'
    },
    bgColor: 'bg-[#02c73c]',
    textColor: 'text-white',
    icon: naverIcon,
  },
  ['kakao']: {
    id: 'kakao',
    content: '카카오 계정으로 로그인',
    signInOptions: {
    },
    bgColor: 'bg-[#fae100]',
    textColor: 'text-[#39181D]',
    icon: kakaoIcon,
  }
}