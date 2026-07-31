import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const stepButtonClass = "flex items-center justify-center text-2xl text-theme-accent disabled:text-theme-text-disabled disabled:opacity-30";

interface SettingStepSelectorProps<T extends string> {
  value: T;
  values: readonly T[];
  displayValue: string;
  onChange: (value: T) => void;
}

export const SettingStepSelector = <T extends string>({
  value,
  values,
  displayValue,
  onChange,
}: SettingStepSelectorProps<T>) => {
  const currentIndex = values.indexOf(value);

  const decrease = () => {
    if (currentIndex > 0) {
      onChange(values[currentIndex - 1]);
    }
  };

  const increase = () => {
    if (currentIndex < values.length - 1) {
      onChange(values[currentIndex + 1]);
    }
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        className={stepButtonClass}
        onClick={decrease}
        disabled={currentIndex === 0}
        type="button"
      >
        <MdChevronLeft />
      </button>
      <span className="min-w-12 text-center text-base font-semibold text-theme-accent">{displayValue}</span>
      <button
        className={stepButtonClass}
        onClick={increase}
        disabled={currentIndex === values.length - 1}
        type="button"
      >
        <MdChevronRight />
      </button>
    </div>
  );
};
