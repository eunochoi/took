'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { subscribeNotice } from './notice';

type Notice = { id: number; message: string };

export const NoticeHost = () => {
  const [notice, setNotice] = useState<Notice | null>(null);
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    let nextId = 0;
    return subscribeNotice((message) => {
      setNotice({ id: ++nextId, message });
    });
  }, []);

  useEffect(() => {
    const updatePortalRoot = () => {
      const dialogs = document.querySelectorAll<HTMLDialogElement>('dialog[open]');
      setPortalRoot(dialogs[dialogs.length - 1] ?? document.body);
    };
    const observer = new MutationObserver(updatePortalRoot);
    observer.observe(document.body, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ['open'],
    });
    updatePortalRoot();

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!notice) return;
    const timeout = window.setTimeout(() => setNotice(null), 3000);
    return () => window.clearTimeout(timeout);
  }, [notice]);

  if (!notice || !portalRoot) return null;

  return createPortal(
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-4 top-[max(1rem,env(safe-area-inset-top))] z-[999999] mx-auto w-fit max-w-[calc(100vw-2rem)] rounded-[20px] border border-theme-border-muted bg-theme-surface-elevated px-5 py-3 text-center text-base font-medium text-theme-text-primary shadow-card tablet:left-auto tablet:mx-0"
    >
      {notice.message}
    </div>,
    portalRoot,
  );
};
