import { deleteHabit } from '@/common/actions/habit';
import { authAction } from '@/common/auth/authAction';
import Menus from '@/common/components/ui/Menus';
import { StarRating } from '@/common/components/ui/StarRating';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  habitId: number;
  habitName: string;
  priority: number;
  isMenuOpen: boolean;
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
  onDeleted?: () => void;
}

const HabitMenus = ({ habitId, habitName, priority, isMenuOpen, setMenuOpen, onDeleted }: Props) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const onDelete = async () => {
    try {
      await authAction(() => deleteHabit({ habitId }));
      onDeleted?.();
      queryClient.invalidateQueries({ queryKey: ['habits'] });
      queryClient.invalidateQueries({ queryKey: ['habit'] });
      queryClient.invalidateQueries({ queryKey: ['diary'] });
      queryClient.invalidateQueries({ queryKey: ['diary-habit', 'month'] });
      queryClient.invalidateQueries({ queryKey: ['stats', 'habit'] });
      queryClient.invalidateQueries({ queryKey: ['stats', 'years'] });
      enqueueSnackbar('습관 항목 삭제 완료');
    } catch (error) {
      enqueueSnackbar(error instanceof Error ? error.message : '습관 항목 삭제 실패');
    }
  };

  return (
    <Menus
      isOpen={isMenuOpen}
      onClose={() => setMenuOpen(false)}
      title="습관 메뉴"
      message="이 습관을 수정하거나 삭제할 수 있어요."
      content={(
        <div className="mt-2 flex flex-wrap items-center justify-center gap-x-1 gap-y-0.5 text-base text-theme-text-primary" aria-label={`${habitName}, 중요도 ${priority + 1}점`}>
          <span className="min-w-0 break-words">{habitName}</span>
          <div className="inline-flex items-center gap-1 whitespace-nowrap" aria-hidden="true">
            <span>(</span>
            <StarRating maxRating={3} rating={priority + 1} className="gap-0.5 text-base" />
            <span>)</span>
          </div>
        </div>
      )}
      onEdit={() => router.push(`/habit/${habitId}/edit`, { scroll: false })}
      onDelete={onDelete}
    />
  );
};

export default HabitMenus;
