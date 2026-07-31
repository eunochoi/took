import { snackbarPrimaryActionClass, snackbarSecondaryActionClass } from "./constants";

interface SnackBarActionProps {
  yesAction: () => void;
  noAction: () => void;
}

export const SnackBarAction = ({ yesAction, noAction }: SnackBarActionProps) => {
  return (
    <div className="flex gap-2">
      <button
        className={snackbarSecondaryActionClass}
        onClick={noAction}
        type="button"
      >
        취소
      </button>
      <button
        className={snackbarPrimaryActionClass}
        onClick={yesAction}
        type="button"
      >
        확인
      </button>
    </div>
  );
};
