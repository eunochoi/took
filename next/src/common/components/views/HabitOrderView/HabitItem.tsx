'use client';

import { StarRating } from "@/common/components/ui/StarRating";
import { cn } from "@/common/utils/cn";
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { MdDragIndicator } from 'react-icons/md';
import { HabitItemProps } from "./_types";

export const HabitItem = ({ habit }: HabitItemProps) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: habit.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "shadow-[0_4px_12px_rgb(var(--theme-shadow-color)/0.08)] bg-theme-surface-muted my-1 flex h-12 w-full max-w-[420px] shrink-0 items-center justify-between rounded-theme px-[18px] py-1 text-sm text-theme-text-primary",
        isDragging && "border-2 border-solid border-theme-accent",
      )}
      style={style}
    >
      <span className='flex w-1/5 justify-center text-base text-theme-accent'><StarRating rating={habit?.priority + 1} /></span>
      <span className='flex w-3/5 justify-center overflow-x-scroll'>{habit?.name}</span>
      <button
        className="flex w-1/5 touch-none justify-center text-theme-text-tertiary"
        {...attributes}
        {...listeners}
        type="button"
      >
        <MdDragIndicator className='flex items-center justify-center' />
      </button>
    </div>
  );
};
