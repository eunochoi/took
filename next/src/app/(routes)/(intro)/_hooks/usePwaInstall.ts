import { useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const usePwaInstall = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const installPwa = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(outcome === 'accepted' ? 'PWA installed' : 'PWA install denied');
      setDeferredPrompt(null);
    } else {
      alert(
        `이미 앱이 설치되어 있는 경우 혹은\n퀵 설치 기능을 지원하지 않는 브라우저입니다.\n\n'메뉴(공유하기)->홈 화면에 추가'를\n진행하여 앱을 설치해주세요.\n\n*크롬(안드로이드), 사파리(iOS) 브라우저에 최적화 되어있습니다.`
      );
    }
  };

  return { installPwa, canInstall: !!deferredPrompt };
};
