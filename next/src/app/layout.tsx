import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { GlobalProviders } from "@/common/providers/GlobalProviders";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { headers } from 'next/headers';


export const metadata: Metadata = {
  title: "Took",
  description: "감정 일기를 적고 목표 습관을 실천하세요! 당신의 변화와 성장을 응원합니다. :)",
  manifest: "/manifest.json",
  icons: {
    icon: '/favicon.png', // 32x32 PNG
  },
};

export const viewport: Viewport = {
  initialScale: 1,
  maximumScale: 1,
  width: 'device-width',
  themeColor: '#ffffff',
  userScalable: false,
  // interactiveWidget: 'resizes-visual',
  interactiveWidget: 'resizes-content'
}

const pretendard = localFont({
  src: '../common/fonts/PretendardVariable.woff2',
  display: "swap",
  weight: "45 920",
  variable: '--font-pretendard',
});

const jotiOne = localFont({
  src: '../common/fonts/JotiOne.woff2',
  display: "swap",
  weight: "400",
  variable: '--font-joti-one',
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const { get } = headers()
  let userAgent = get('user-agent')
  userAgent = userAgent ? userAgent.toLowerCase() : '';
  const isIosDevice = userAgent?.includes('iphone') || userAgent?.includes('macintosh');

  const queryClient = new QueryClient();

  const dehydratedState = dehydrate(queryClient)

  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="MSSWdnca2PMfsNV3MPmssa5cjQqycFJmdrj04DFx5fU" />
        {/* <link rel="manifest" href="/manifest.json" /> */}

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

        {isIosDevice && <meta name="apple-mobile-web-app-capable" content="yes" />}
        <meta name="mobile-web-app-capable" content="yes" />

        <meta name="theme-color" content="#f3f7fc" />
        <meta property="og:title" content="Took" />
        <meta property="og:description" content="감정 일기를 적고 습관을 실천하세요. 당신의 긍정적 변화와 성장을 응원합니다. :)" />
        <meta property="og:image" content="https://i.ibb.co/WfHNc58/shareImg.png" />
      </head>

      <body className={`${pretendard.variable} ${jotiOne.variable}`}>
        <GlobalProviders dehydratedState={dehydratedState}>
          {children}
        </GlobalProviders>
      </body>
    </html>
  );
}
