import type { Metadata, Viewport } from "next";
import "./globals.css";

import { GlobalProviders } from "@/common/providers/GlobalProviders";
import { THEME_BG_DARK_MODE, THEME_LOCAL_STORAGE_KEY, THEME_VALUE } from "@/common/types/theme";


export const metadata: Metadata = {
  title: {
    default: 'took',
    template: '%s - took',
  },
  description: "감정도 툭! 습관도 툭! 조금 더 나은 나로 To OK. 습관과 감정을 기록하고 나만의 속도로 하루를 쌓아가요.",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16 32x32 48x48', type: 'image/x-icon' },
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon/icon-48x48.png', sizes: '48x48', type: 'image/png' },
    ],
    apple: { url: '/icon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
  },
};

export const viewport: Viewport = {
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  width: 'device-width',
  interactiveWidget: 'resizes-content'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const localThemeInitScript = `
    (function () {
      try {
        var storedValue = window.localStorage.getItem(${JSON.stringify(THEME_LOCAL_STORAGE_KEY)});
        var preference = storedValue ? JSON.parse(storedValue) : null;
        var themeValues = ${JSON.stringify(THEME_VALUE)};
        var themeName = preference && themeValues[preference.theme]
          ? preference.theme
          : 'blue';
        var accent = themeValues[themeName];
        var isDarkMode = preference && preference.mode === '어둡게';
        var accentLight = isDarkMode
          ? '${THEME_BG_DARK_MODE}'
          : accent.accentLight;
        var themeColor = 'rgb(' + accentLight + ')';

        document.documentElement.dataset.themeAccent = themeName;
        document.documentElement.dataset.themeMode = isDarkMode ? '어둡게' : '밝게';
        document.documentElement.style.setProperty('--loading-background', themeColor);
        document.documentElement.style.setProperty('--loading-indicator', 'rgb(' + accent.accent + ')');

        var isFixedLightPage = ['/', '/login', '/intro', '/privacy', '/account-deletion'].includes(location.pathname);
        var statusBarColor = isFixedLightPage ? 'rgb(240 247 255)' : themeColor;
        var metaThemeColor = document.getElementById('theme-color');
        if (metaThemeColor) metaThemeColor.setAttribute('content', statusBarColor);

        if (window.ReactNativeWebView) {
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'THEME_CHANGE',
            color: statusBarColor,
            style: isDarkMode && !isFixedLightPage ? 'light' : 'dark'
          }));
        }
      } catch (error) {
        document.documentElement.style.setProperty('--loading-background', 'rgb(240 247 255)');
        document.documentElement.style.setProperty('--loading-indicator', 'rgb(140 173 226)');
      }
    })();
  `;

  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <meta id="theme-color" name="theme-color" content="#F0F7FF" />
        <link rel="preload" href="/fonts/Fredoka[wdth,wght].ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <script dangerouslySetInnerHTML={{ __html: localThemeInitScript }} />
        <meta name="google-site-verification" content="MSSWdnca2PMfsNV3MPmssa5cjQqycFJmdrj04DFx5fU" />
        {/* iOS 스플래시 이미지 (portrait only) */}
        <link rel="apple-touch-startup-image" media="screen and (device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3)" href="/splash_screens/iPhone_15_Pro_Max__iPhone_15_Plus__iPhone_14_Pro_Max_portrait.png" />
        <link rel="apple-touch-startup-image" media="screen and (device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3)" href="/splash_screens/iPhone_15_Pro__iPhone_15__iPhone_14_Pro_portrait.png" />
        <link rel="apple-touch-startup-image" media="screen and (device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3)" href="/splash_screens/iPhone_14_Plus__iPhone_13_Pro_Max__iPhone_12_Pro_Max_portrait.png" />
        <link rel="apple-touch-startup-image" media="screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3)" href="/splash_screens/iPhone_14__iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12_portrait.png" />
        <link rel="apple-touch-startup-image" media="screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)" href="/splash_screens/iPhone_13_mini__iPhone_12_mini__iPhone_11_Pro__iPhone_XS__iPhone_X_portrait.png" />
        <link rel="apple-touch-startup-image" media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)" href="/splash_screens/iPhone_11_Pro_Max__iPhone_XS_Max_portrait.png" />
        <link rel="apple-touch-startup-image" media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)" href="/splash_screens/iPhone_11__iPhone_XR_portrait.png" />
        <link rel="apple-touch-startup-image" media="screen and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3)" href="/splash_screens/iPhone_8_Plus__iPhone_7_Plus__iPhone_6s_Plus__iPhone_6_Plus_portrait.png" />
        <link rel="apple-touch-startup-image" media="screen and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)" href="/splash_screens/iPhone_8__iPhone_7__iPhone_6s__iPhone_6__4.7__iPhone_SE_portrait.png" />
        <link rel="apple-touch-startup-image" media="screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)" href="/splash_screens/4__iPhone_SE__iPod_touch_5th_generation_and_later_portrait.png" />

        <meta name="mobile-web-app-capable" content="yes" />

        <meta property="og:title" content="took - 감정일기 · 습관관리 · 할일" />
        <meta property="og:description" content="감정도 툭! 습관도 툭! 조금 더 나은 나로 To OK. 습관과 감정을 기록하고 나만의 속도로 하루를 쌓아가요." />
        <meta property="og:image" content={process.env.OG_IMAGE_URL || 'https://to-ok.me/img/share/og-image.png'} />
      </head>

      <body>
        <GlobalProviders>
          {children}
        </GlobalProviders>
      </body>
    </html>
  );
}
