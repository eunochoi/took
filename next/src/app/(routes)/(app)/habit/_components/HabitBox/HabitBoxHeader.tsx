import EditDeleteMenu from "@/common/components/ui/EditDeleteMenu";
import HabitIcon from "@/common/components/ui/HabitIcon";
import { StarRating } from "@/common/components/ui/StarRating";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useRef } from "react";
import { MdMoreVert } from 'react-icons/md';

interface Props {
  id: number;
  name: string;
  priority: number;
  iconKey: string;
  isMenuOpen: boolean;
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
  onDeleteHabit: () => void;
}

const HabitBoxHeader = ({ id, name, priority, iconKey, isMenuOpen, setMenuOpen, onDeleteHabit }: Props) => {
  const router = useRouter();
  const menuAnchorRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="min-w-0">
      <div className="relative mb-2 min-w-0">
        <Link
          href={`/habit/${id}`}
          scroll={false}
          className="flex min-w-0 flex-col items-center gap-2 font-semibold text-theme-text-primary"
          aria-label={`${name} 습관 정보`}
        >
          <HabitIcon iconKey={iconKey} className="shrink-0 text-3xl" />
          <span className="w-full truncate text-base text-center">{name}</span>
        </Link>
        <button
          ref={menuAnchorRef}
          type="button"
          className="absolute right-0 top-0 flex h-9 w-8 items-center justify-center text-xl text-theme-text-secondary"
          aria-label={`${name} 수정·삭제 메뉴`}
          aria-expanded={isMenuOpen}
          aria-controls={isMenuOpen ? `habit-menu-${id}` : undefined}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <MdMoreVert aria-hidden="true" />
        </button>
        <EditDeleteMenu
          id={`habit-menu-${id}`}
          isMenuOpen={isMenuOpen}
          setMenuOpen={setMenuOpen}
          anchorRef={menuAnchorRef}
          onEdit={() => router.push(`/habit/${id}/edit`, { scroll: false })}
          onDelete={onDeleteHabit}
          vertical
        />
      </div>
      <div className="flex flex-wrap justify-center items-center gap-x-1.5 text-sm text-theme-accent" aria-label={`우선순위 ${priority + 1}점`}>
        <span>우선순위</span>
        <StarRating maxRating={3} rating={priority + 1} className="gap-0.5 text-sm" />
      </div>
    </div>
  );
};

export default HabitBoxHeader;
