import React from 'react';

export type ISnackBarView = 'success' | 'info' | 'warning' | 'error';

export interface ISnackBar {
  view: boolean;
  msg: string;
  severity: ISnackBarView;
}

export interface IDialogUI {
  view: boolean;
  title: string;
  mainContent: React.ReactElement;
}

export interface IBackdrop {
  view: boolean;
  content: React.ReactNode;
}
