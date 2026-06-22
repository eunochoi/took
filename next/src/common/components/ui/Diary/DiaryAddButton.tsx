import { useRouter } from 'next/navigation';
import { MdAdd } from 'react-icons/md';

interface Props {
  date: string;
}

const DiaryAddButton = ({ date }: Props) => {
  const router = useRouter();

  const onAddDiary = () => {
    router.push(`/inter/input/addDiary?date=${date}`, { scroll: false });
  };

  return (
    <div className="box-border flex h-full w-full items-center justify-center">
      <button
        className="flex items-center gap-2 text-app text-theme"
        onClick={onAddDiary}
        type="button"
      >
        <MdAdd />
        <span>새 일기 작성</span>
      </button>
    </div>
  );
};

export default DiaryAddButton;
