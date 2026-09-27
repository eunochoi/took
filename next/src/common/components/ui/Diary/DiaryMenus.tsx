import { deleteDiary } from "@/common/actions/diary";
import { authAction } from "@/common/auth/authAction";
import Menus from '@/common/components/ui/Menus';
import type { DiaryMenuData } from "@/common/types/diary";
import { parseLocalDate } from "@/common/utils/date/parseLocalDate";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
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
      enqueueSnackbar('일기 삭제 완료');
      onDeleted?.();
    } catch (error) {
      enqueueSnackbar(error instanceof Error ? error.message : '일기 삭제 실패');
    }
  };
  const dateLabel = format(parseLocalDate(diaryData.date), 'yyyy년 M월 d일 작성 일기');

  return (
    <Menus
      isOpen={isMenuOpen}
      onClose={() => setMenuOpen(false)}
      title="일기 메뉴"
      content={<p className="mt-2 text-center text-base text-theme-text-primary">{dateLabel}</p>}
      message="이 날짜의 일기를 수정하거나 삭제할 수 있어요."
      onEdit={() => router.push(`/diary/${diaryData.id}/edit`, { scroll: false })}
      onDelete={onDelete}
    />
  );
};

export default DiaryMenus;
