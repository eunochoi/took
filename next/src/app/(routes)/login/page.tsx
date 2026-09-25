'use client';

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import LoginTopSection from './_components/LoginTopSection';
import LoginBottomSection from './_components/LoginBottomSection';


const Page = () => {
  const router = useRouter();

  useEffect(() => {
    router.prefetch('/home');
    router.prefetch('/calendar');
    router.prefetch('/diary');
    router.prefetch('/habit');
    router.prefetch('/setting');
  }, [router]);

  return (
    <main className="static-theme-blue h-[100dvh] w-full overflow-y-auto bg-theme-accent-light font-title text-theme-text-primary">
      <div className="grid min-h-full desktop:grid-cols-[1.35fr_1fr]">
        <LoginTopSection />
        <LoginBottomSection />
      </div>
    </main>
  );
};

export default Page;
