"use client";

import { SnackbarProvider as SnackbarProviderLib } from "notistack";
import { FC, ReactNode } from "react";

type SnackbarProviderProps = {
  children: ReactNode;
};

export const SnackbarProvider: FC<SnackbarProviderProps> = ({ children }) => {
  return <SnackbarProviderLib>{children}</SnackbarProviderLib>;
};
