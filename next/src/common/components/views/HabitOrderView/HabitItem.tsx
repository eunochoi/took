'use client';

import { StarRating } from "@/common/components/ui/StarRating";
import { cn } from "@/common/utils/cn";
import { MdDragIndicator } from 'react-icons/md';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
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
        "my-1 flex h-12 w-full max-w-[420px] shrink-0 items-center justify-between rounded-2xl px-[18px] py-1 text-base text-grey-title",
        isDragging
          ? "bg-white/90 shadow-[0_4px_12px_rgba(0,0,0,0.08)] backdrop-blur-xl"
          : "bg-white/50 shadow-card",
      )}
      style={style}
    >
      <span className='flex w-1/5 justify-center text-base text-theme'><StarRating rating={habit?.priority + 1} /></span>
      <span className='flex w-3/5 justify-center overflow-x-scroll'>{habit?.name}</span>
      <button
        className="flex w-1/5 touch-none justify-center text-gray-400"
        {...attributes}
        {...listeners}
        type="button"
      >
        <MdDragIndicator className='flex items-center justify-center' />
      </button>
    </div>
  );
};
