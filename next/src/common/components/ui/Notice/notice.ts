type NoticeListener = (message: string) => void;

const listeners = new Set<NoticeListener>();

export const showNotice = (message: string) => {
  listeners.forEach((listener) => listener(message));
};

export const subscribeNotice = (listener: NoticeListener) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};
