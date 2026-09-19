'use client';

import { MaterialDesignContent, SnackbarProvider } from "notistack";
import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

const CustomSnackbarProvider = ({ children }: Props) => {
  return (
    <SnackbarProvider
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
