import EditDeleteMenu from "@/common/components/ui/EditDeleteMenu";
import { StarRating } from "@/common/components/ui/StarRating";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useRef } from "react";
import { MdChevronRight, MdMoreVert } from 'react-icons/md';

interface Props {
  id: number;
  name: string;
  priority: number;
  isMenuOpen: boolean;
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
  onDeleteHabit: () => void;
}

const HabitBoxHeader = ({ id, name, priority, isMenuOpen, setMenuOpen, onDeleteHabit }: Props) => {
  const router = useRouter();
  const menuAnchorRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="min-w-0">
      <div className="flex mb-2 min-w-0 items-center justify-between gap-1">
        <Link
          href={`/inter/habitInfo?id=${id}`}
          scroll={false}
          className="flex min-w-0 items-center gap-1 font-semibold text-theme-text-primary sm:text-lg"
          aria-label={`${name} 습관 정보`}
        >
          <span className="truncate text-lg" title={name}>{name}</span>
          <MdChevronRight className="shrink-0 text-xl" aria-hidden="true" />
        </Link>
        <button
          ref={menuAnchorRef}
          type="button"
          className="-mr-2 flex w-8 shrink-0 items-center justify-center text-xl text-theme-text-secondary"
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
          onEdit={() => router.push(`/inter/input/editHabit?id=${id}`, { scroll: false })}
          onDelete={onDeleteHabit}
          vertical
        />
      </div>
      <div className="flex flex-wrap items-center gap-x-1.5 text-sm text-theme-accent" aria-label={`우선순위 ${priority + 1}점`}>
        <span>우선순위</span>
        <StarRating maxRating={3} rating={priority + 1} className="gap-0.5 text-sm" />
      </div>
    </div>
  );
};

export default HabitBoxHeader;
