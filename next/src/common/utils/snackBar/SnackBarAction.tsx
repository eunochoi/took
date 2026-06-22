interface SnackBarActionProps {
  yesAction: () => void;
  noAction: () => void;
}

export const SnackBarAction = ({ yesAction, noAction }: SnackBarActionProps) => {
  return (
    <div className="flex gap-2">
      <button
        className="rounded-[14px] bg-[rgba(220,120,137,0.9)] px-4 py-1.5 font-medium text-white"
        onClick={noAction}
        type="button"
      >
        no
      </button>
      <button
        className="rounded-[14px] bg-[rgba(131,198,182,0.9)] px-4 py-1.5 font-medium text-white"
        onClick={yesAction}
        type="button"
      >
        yes
      </button>
    </div>
  );
};
