'use client';

import { closestCenter, DndContext, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Dispatch, memo, SetStateAction } from "react";
import { HabitItem } from "./HabitItem";
import { Habit } from "./_types";

import { restrictToParentElement, restrictToVerticalAxis } from '@dnd-kit/modifiers';

interface HabitListProps {
  // children: ReactNode; //재사용 컴포넌트가 아니기 때문에 children props 사용 X 
  tempHabits: Habit[];
  setTempHabits: Dispatch<SetStateAction<Habit[]>>;
}

//React.Memo를 이용해서 상위 컴포넌트 useQuery에서 발생하는 리렌더링 방지
//DndContext가 리렌더링되는 경우 초기사태로 돌아가니 드래그 과정 중 리렌더링 되지 않도로 주의해야한다. 
export const HabitList = memo(({ tempHabits, setTempHabits }: HabitListProps) => {

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor)
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setTempHabits((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };


  return (<DndContext
    sensors={sensors}
    collisionDetection={closestCenter}
    onDragEnd={handleDragEnd}
    modifiers={[restrictToVerticalAxis, restrictToParentElement]}
  >
    <SortableContext items={tempHabits.map((tempHabit: Habit) => tempHabit.id)} strategy={verticalListSortingStrategy}>
      {tempHabits.map((tempHabit: Habit) => (
        <HabitItem key={tempHabit.id} habit={tempHabit} />
      ))}
    </SortableContext>

  </DndContext>);
})

HabitList.displayName = 'HabitList';
