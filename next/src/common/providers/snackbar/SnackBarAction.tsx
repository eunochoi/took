interface SnackBarActionProps {
  yesAction: () => void;
  noAction: () => void;
}

export const SnackBarAction = ({ yesAction, noAction }: SnackBarActionProps) => {
  return (
    <div className="flex gap-2">
      <button
        className="rounded-2xl bg-theme-surface-muted px-4 py-1.5 font-medium text-theme-text-secondary shadow-card"
        onClick={noAction}
        type="button"
      >
        취소
      </button>
      <button
        className="rounded-2xl bg-theme-accent px-4 py-1.5 font-medium text-theme-text-on-accent shadow-card"
        onClick={yesAction}
        type="button"
      >
        확인
      </button>
    </div>
  );
};
