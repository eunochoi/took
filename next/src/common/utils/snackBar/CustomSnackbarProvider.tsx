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
        info: MaterialDesignContent,
        success: MaterialDesignContent,
        error: MaterialDesignContent,
      }}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      maxSnack={1}
      autoHideDuration={1500}
      preventDuplicate={true}
    >
      {children}
    </SnackbarProvider>
  );
};

export default CustomSnackbarProvider;
