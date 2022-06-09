import React from 'react';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type DialogSizeType = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;

export interface IDialogContent {
  element: React.ReactNode | null;
  dialogSize?: DialogSizeType;
}

export interface IDialogState extends IDialogContent {
  dialogVisible: boolean;
}

export type SnackbarSeverity = 'warning' | 'error' | 'info' | 'success';

export interface ISnackbarContent {
  snackbarType: SnackbarSeverity | null;
  snackbarMsg: string;
}

export interface ISnackbar extends ISnackbarContent {
  snackbarVisible: boolean;
}

const initialState: IDialogState & ISnackbar = {
  dialogVisible: false,
  element: null,
  snackbarMsg: '',
  snackbarType: null,
  snackbarVisible: false,
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    showDialog(state, action: PayloadAction<IDialogState>) {
      state.dialogVisible = true;
      state.element = action.payload.element;

      if (action.payload.dialogSize) {
        state.dialogSize = action.payload.dialogSize;
      }
    },
    closeDialog(state) {
      state.dialogVisible = false;
      state.element = null;
      state.dialogSize = false;
    },
    changeContent(state, action: PayloadAction<IDialogContent>) {
      state.dialogVisible = true;
      state.element = action.payload.element;
    },
    setSnackbar(state, action: PayloadAction<ISnackbarContent>) {
      const { snackbarMsg, snackbarType } = action.payload;

      state.snackbarVisible = true;
      state.snackbarMsg = snackbarMsg;

      if (snackbarType !== null) {
        state.snackbarType = snackbarType;
      }
    },
    closeSnackbar(state, action: PayloadAction<undefined>) {
      state.snackbarVisible = false;
      state.snackbarMsg = '';
      state.snackbarType = null;
    },
  },
});

export const { actions: globalActions, reducer: globalReducer } = globalSlice;
