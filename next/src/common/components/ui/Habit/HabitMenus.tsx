import { deleteHabit } from '@/common/actions/habit';
import { authAction } from '@/common/auth/authAction';
import Menus from '@/common/components/ui/Menus';
import { showNotice } from '@/common/components/ui/Notice/notice';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
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
      showNotice('습관 항목 삭제 완료');
    } catch (error) {
      showNotice(error instanceof Error ? error.message : '습관 항목 삭제 실패');
    }
  };

  const starText = priority === 0 ? '★' : priority === 1 ? '★★' : '★★★';

  return (
    <Menus
      isOpen={isMenuOpen}
      onClose={() => setMenuOpen(false)}
      title={`${habitName} (${starText})`}
      message="목표가 바뀌었다면 언제든 수정하거나 삭제해 보세요"
      onEdit={() => router.push(`/habit/${habitId}/edit`, { scroll: false })}
      onDelete={onDelete}
    />
  );
};

export default HabitMenus;
