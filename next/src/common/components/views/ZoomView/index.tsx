'use client';

import { getDiaryById } from "@/common/actions/diary";
import { authAction } from "@/common/auth/authAction";
import { Modal } from "@/common/components/ui/Modal";
import { ModalHeader } from "@/common/components/ui/Modal/ModalHeader";
import { ScrollContainer } from "@/common/components/ui/ScrollContainer";
import { cn } from "@/common/utils/cn";
import { parseLocalDate } from "@/common/utils/date/parseLocalDate";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { AnimatePresence } from "framer-motion";
import { notFound, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ZoomViewEntry } from "./ZoomViewEntry";
import { ZoomViewGallery } from "./ZoomViewGallery";

interface ZoomViewProps {
  diaryId: string;
}

const ZoomView = ({ diaryId }: ZoomViewProps) => {
  const router = useRouter();
  const [isModalMounted, setIsModalMounted] = useState(true);
  const { data: diaryData, isError } = useQuery({
    queryKey: ['diary', 'id', diaryId],
    queryFn: () => authAction(() => getDiaryById({ id: diaryId })),
    enabled: diaryId !== null,
  });

  useEffect(() => {
    if (isError) notFound();
  }, [isError]);

  if (!diaryData) return null;

  const headerTitle = format(parseLocalDate(diaryData.date), 'yyyy년 M월 d일 eeee', { locale: ko });
  const hasImages = diaryData.Images.length > 0;

  return (
    <AnimatePresence onExitComplete={() => router.back()}>
      {isModalMounted && (
        <Modal
          ariaLabel={headerTitle}
          onClose={() => setIsModalMounted(false)}
          overlayClassName="z-[99999]"
          variant={{ base: 'full', tablet: 'full', desktop: 'full' }}
        >
          <ModalHeader
            title={headerTitle}
            onBack={() => setIsModalMounted(false)}
            backLabel="뒤로가기"
          />
          <ScrollContainer className="flex-1" scrollAreaClassName="overscroll-y-contain">
            <div
              className={cn(
                "mx-auto grid w-full min-w-0 grid-cols-1 items-start gap-8 px-[4dvw] pt-5 pb-[max(2rem,env(safe-area-inset-bottom))] tablet:px-6 desktop:gap-16 desktop:pt-10 desktop:pb-16",
                "landscape-short:gap-6 landscape-short:pt-2",
                hasImages
                  ? "max-w-7xl desktop:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] landscape-short:min-[640px]:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]"
                  : "max-w-[760px] desktop:pt-12",
              )}
            >
              <ZoomViewEntry diaryData={diaryData} />
              {hasImages && <ZoomViewGallery key={diaryData.id} images={diaryData.Images} />}
            </div>
          </ScrollContainer>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default ZoomView;
