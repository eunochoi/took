import { deleteDiary } from "@/common/actions/diary";
import { authAction } from "@/common/auth/authAction";
import Menus from '@/common/components/ui/Menus';
import { showNotice } from '@/common/components/ui/Notice/notice';
import { EMOTIONS } from "@/common/constants/emotions";
import type { DiaryMenuData } from "@/common/types/diary";
import { parseLocalDate } from "@/common/utils/date/parseLocalDate";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

interface Props {
  isMenuOpen: boolean;
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
  diaryData: DiaryMenuData;
  onDeleted?: () => void;
}

const DiaryMenus = ({ isMenuOpen, setMenuOpen, diaryData, onDeleted }: Props) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const onDelete = async () => {
    try {
      await authAction(() => deleteDiary({ id: diaryData.id }));
      queryClient.invalidateQueries({ queryKey: ['diary'] });
      queryClient.invalidateQueries({ queryKey: ['diary-habit', 'month'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
      showNotice('일기 삭제 완료');
      onDeleted?.();
    } catch (error) {
      showNotice(error instanceof Error ? error.message : '일기 삭제 실패');
    }
  };
  const dateLabel = format(parseLocalDate(diaryData.date), 'yyyy년 M월 d일');

  return (
    <Menus
      isOpen={isMenuOpen}
      onClose={() => setMenuOpen(false)}
      title={`${dateLabel} (${EMOTIONS[diaryData.emotion]?.nameKr ?? EMOTIONS[9].nameKr})`}
      message="내 감정의 기록을 언제든 편하게 다듬어 보세요"
      onEdit={() => router.push(`/diary/${diaryData.id}/edit`, { scroll: false })}
      onDelete={onDelete}
    />
  );
};

export default DiaryMenus;
