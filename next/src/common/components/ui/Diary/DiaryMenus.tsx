import { deleteDiary } from "@/common/actions/diary";
import { authAction } from "@/common/auth/authAction";
import type { DiaryMenuData } from "@/common/types/diary";
import EditDeleteMenu from "@/common/components/ui/EditDeleteMenu";
import { parseLocalDate } from "@/common/utils/date/parseLocalDate";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import { Dispatch, RefObject, SetStateAction } from "react";
import { SnackBarAction } from "../../../providers/snackbar/SnackBarAction";

interface Props {
  isMenuOpen: boolean;
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
  anchorRef: RefObject<HTMLElement>;
  diaryData: DiaryMenuData;
}

const DiaryMenus = ({ isMenuOpen, setMenuOpen, anchorRef, diaryData }: Props) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const onClickDeleteButton = () => {
    const action = () => (
      <SnackBarAction
        yesAction={async () => {
          closeSnackbar('diaryDelete');
          try {
            await authAction(() => deleteDiary({ id: diaryData.id }));
            queryClient.invalidateQueries({ queryKey: ['diary'] });
            queryClient.invalidateQueries({ queryKey: ['diary-habit', 'month'] });
            queryClient.invalidateQueries({ queryKey: ['stats'] });
            enqueueSnackbar('일기 삭제 완료');
          } catch (error) {
            enqueueSnackbar(error instanceof Error ? error.message : '일기 삭제 실패');
          }
        }}
        noAction={() => {
          closeSnackbar('diaryDelete');
        }} />
    );
    enqueueSnackbar(`${format(parseLocalDate(diaryData.date), 'yy년 M월 d일')} 일기를 지우시겠습니까?`, { key: 'diaryDelete', persist: false, action, autoHideDuration: 3000 });
  };
  const onClickEdit = () => {
    router.push(`/inter/input/editDiary?id=${diaryData.id}`, { scroll: false });
  };

  return (
    <EditDeleteMenu
      isMenuOpen={isMenuOpen}
      setMenuOpen={setMenuOpen}
      anchorRef={anchorRef}
      onEdit={onClickEdit}
      onDelete={onClickDeleteButton}
      vertical
    />
  );
};

export default DiaryMenus;
