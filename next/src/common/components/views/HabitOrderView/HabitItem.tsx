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
        "shadow-[0_4px_12px_rgba(0,0,0,0.08)] bg-white my-1 flex h-12 w-full max-w-[420px] shrink-0 items-center justify-between rounded-2xl px-[18px] py-1 text-sm text-grey-title",
        isDragging && "border-2 border-solid border-theme",
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
