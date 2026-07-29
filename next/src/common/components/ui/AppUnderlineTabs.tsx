import { cn } from "@/common/utils/cn";

interface AppUnderlineTabsOption<T extends string | number> {
  label: string;
  value: T;
}

interface AppUnderlineTabsProps<T extends string | number> {
  options: AppUnderlineTabsOption<T>[];
  value: T;
  onChange: (value: T) => void;
}

const AppUnderlineTabs = <T extends string | number>({
  options,
  value,
  onChange,
}: AppUnderlineTabsProps<T>) => {
  return (
    <div className="flex gap-3">
      {options.map((option) => (
        <button
          key={option.value}
          className={cn(
            "border-b-2 pb-1 text-base",
            value === option.value
              ? "border-theme-accent font-semibold text-theme-text-primary"
              : "border-transparent font-normal text-theme-text-tertiary",
          )}
          onClick={() => onChange(option.value)}
          type="button"
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default AppUnderlineTabs;
