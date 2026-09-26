'use client';

import { getDiaryById } from "@/common/actions/diary";
import { authAction } from "@/common/auth/authAction";
import { PanelDialog } from "@/common/components/ui/PanelDialog";
import { PanelBody } from "@/common/components/ui/PanelDialog/PanelBody";
import { PanelHeader } from "@/common/components/ui/PanelDialog/PanelHeader";
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
  const [isDialogMounted, setIsDialogMounted] = useState(true);
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
      {isDialogMounted && (
        <PanelDialog
          ariaLabel={headerTitle}
          onClose={() => setIsDialogMounted(false)}
        >
          <PanelHeader
            title={headerTitle}
            onBack={() => setIsDialogMounted(false)}
            backLabel="뒤로가기"
          />
          <PanelBody>
            <div className="flex w-full min-w-0 flex-col gap-8 pt-5 pb-[max(2rem,env(safe-area-inset-bottom))] landscape-short:gap-6 landscape-short:pt-2">
              <ZoomViewEntry diaryData={diaryData} />
              {hasImages && <ZoomViewGallery key={diaryData.id} images={diaryData.Images} />}
            </div>
          </PanelBody>
        </PanelDialog>
      )}
    </AnimatePresence>
  );
};

export default ZoomView;
