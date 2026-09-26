'use client';

import { MaterialDesignContent, SnackbarProvider } from "notistack";
import { ReactNode, useEffect, useState } from "react";

interface Props {
  children?: ReactNode;
}

const CustomSnackbarProvider = ({ children }: Props) => {
  const [dialogRoot, setDialogRoot] = useState<HTMLDialogElement | undefined>();

  useEffect(() => {
    const updateDialogRoot = () => {
      const openDialogs = document.querySelectorAll<HTMLDialogElement>('dialog[open]');
      setDialogRoot(openDialogs[openDialogs.length - 1]);
    };
    const observer = new MutationObserver(updateDialogRoot);
    observer.observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ['open'] });
    updateDialogRoot();

    return () => observer.disconnect();
  }, []);

  return (
    <SnackbarProvider
      domRoot={dialogRoot}
      Components={{
        default: MaterialDesignContent,
      }}
      classes={{
        containerRoot: "app-snackbar-container",
        root: "app-snackbar-root",
      }}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      maxSnack={1}
      autoHideDuration={3000}
      preventDuplicate={true}
    >
      {children}
    </SnackbarProvider>
  );
};

export default CustomSnackbarProvider;
