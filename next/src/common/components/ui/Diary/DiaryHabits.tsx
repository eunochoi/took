import type { DiaryHabit } from '@/common/types/diary';
import { lightenColor } from "@/common/utils/lightenColor";
import { useRouter } from "next/navigation";
import styled from "styled-components";

interface Props {
  habits: DiaryHabit[];
}

// 완료 습관 태그
const DiaryHabits = ({ habits }: Props) => {
  const router = useRouter();
  const completedCount = habits?.length ?? 0;

  const handleHabitClick = (habitId: number) => {
    router.push(`/inter/habitInfo?id=${habitId}`, { scroll: false });
  };

  return (
    <Habits>
      <Habit>
        <span>{completedCount}개 완료</span>
      </Habit>
      {habits?.map((habit) => (
        <Habit
          key={habit.id}
          onClick={() => handleHabitClick(habit.id)}
        >
          <span>{habit.name}</span>
        </Habit>
      ))}
    </Habits>
  );
};

export default DiaryHabits;

const Habits = styled.div`
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;

  width: 100%;
  height: auto;
  padding: 14px;
  padding-top: 0;
  
  display: flex;
  flex-shrink: 0;
  justify-content: start;
  gap: 8px;

  overflow-x: scroll;
  flex-wrap: nowrap;
`
const Habit = styled.span`
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  flex-shrink: 0;

  padding: 4px 14px;
  border-radius: 14px;
  line-height: 1.4;
  white-space: nowrap;
  
  background-color: ${(props) => props.theme.themeColor ? lightenColor(props.theme.themeColor, 60) : '#E4E8F2'};

  span {
    font-size: 14px;
    font-weight: 500;
    color: rgb(var(--greyTitle));
    text-transform: capitalize;
  }
  &:first-child {
    background-color: ${(props) => props.theme.themeColor ? props.theme.themeColor : '#979FC7'};
    span {
      color: white;
    }
  }
`
