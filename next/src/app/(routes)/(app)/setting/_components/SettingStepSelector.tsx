import { MdChevronLeft, MdChevronRight } from "react-icons/md";

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
        className="flex items-center justify-center text-2xl text-theme disabled:text-grey-title disabled:opacity-30"
        onClick={decrease}
        disabled={currentIndex === 0}
        type="button"
      >
        <MdChevronLeft />
      </button>
      <span className="min-w-12 text-center text-sm font-semibold text-theme">{displayValue}</span>
      <button
        className="flex items-center justify-center text-2xl text-theme disabled:text-grey-title disabled:opacity-30"
        onClick={increase}
        disabled={currentIndex === values.length - 1}
        type="button"
      >
        <MdChevronRight />
      </button>
    </div>
  );
};
