interface Props {
  habitName: string;
  setHabitName: (name: string) => void;
}

export const HabitName = ({ habitName, setHabitName }: Props) => {
  return (
    <div className="w-full">
      <input
        className="w-full text-base"
        onChange={(e) => setHabitName(e.currentTarget.value)}
        value={habitName || ""}
        placeholder="습관 이름을 입력하세요"
      />
    </div>
  );
};
