import { cn } from "@/common/utils/cn";
import { StarRating } from '../../ui/StarRating';

const PRIORITY_LABELS = ['낮음', '보통', '높음'] as const;

interface Props {
  priority: number;
  setPriority: (n: number) => void;
}

export const HabitRating = ({ priority, setPriority }: Props) => {
  return (
    <div className="flex w-full gap-3">
      {[0, 1, 2].map((i) => {
        const selected = i === priority;

        return (
          <label
            key={i}
            className={cn(
              "flex min-w-0 flex-1 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl px-2 py-3 transition-colors duration-200",
              selected && "bg-theme",
            )}
            style={selected ? undefined : { backgroundColor: "color-mix(in srgb, var(--theme-color) 30%, white)" }}
          >
            <input
              className="pointer-events-none absolute opacity-0"
              type="radio"
              checked={selected}
              name="priority"
              value={i}
              onChange={() => setPriority(i)}
            />
            <div className="flex items-center justify-center text-app">
              <StarRating rating={i + 1} color={selected ? '#fff' : undefined} />
            </div>
            <span className={cn("text-[13px] font-medium", selected ? "text-white" : "text-grey-title")}>
              {PRIORITY_LABELS[i]}
            </span>
          </label>
        );
      })}
    </div>
  );
};
