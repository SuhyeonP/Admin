import React from 'react';
import { IBackdrop, IDialogUI, ISnackBar } from '~/model/store';
import { IDataVoid, IVoid } from '~/model/common';

interface IGlobalContext {
  controlDialog: IDataVoid<IDialogUI>;
  closeDialog: IVoid;
  changeDialogContent: IDataVoid<React.ReactElement>;

  snackbarInfo: ISnackBar;
  controlSnackbar: IDataVoid<ISnackBar>;
  closeSnackbar: IVoid;

  backdrop: IBackdrop;
  closeBackdrop: IVoid;
  controlBackdrop: IDataVoid<IBackdrop>;
}

export const GlobalContext = React.createContext<IGlobalContext>({
  controlDialog: data => {
    //
  },
  closeDialog: () => {
    //
  },
  changeDialogContent: data => {
    //
  },

  snackbarInfo: {
    view: false,
    msg: '',
    severity: 'info',
  },
  controlSnackbar: data => {
    //
  },
  closeSnackbar: () => {
    //
  },

  backdrop: {
    view: false,
    content: <></>,
  },
  controlBackdrop: data => {
    //
  },
  closeBackdrop: () => {
    //
  },
});
