import React from 'react';
import { GlobalContext } from '~/model/globalModel';
import { IBackdrop, IDialogUI, ISnackBar } from '~/model/store';
import { IChildren } from '~/model/common';
import {
  GlobalBackdrop,
  GlobalDialog,
  GlobalSnackbar,
} from '~/components/common/globalContent';

const GlobalLayout = ({ children }: IChildren): JSX.Element => {
  const [isVisibleDialog, setIsVisibleDialog] = React.useState(false);
  const [dialogContent, setDialogContent] = React.useState<React.ReactElement>(
    <></>,
  );
  const [dialogTitle, setDialogTitle] = React.useState<string>('');
  const [snackbarInfo, setSnackbarInfo] = React.useState<ISnackBar>({
    view: false,
    msg: '',
    severity: 'info',
  });
  const [backdrop, setBackdrop] = React.useState<IBackdrop>({
    view: false,
    content: <>test</>,
  });

  const closeSnackbar = React.useCallback(() => {
    setSnackbarInfo(prev => {
      return {
        ...prev,
        view: false,
      };
    });
  }, []);

  const controlSnackbar = React.useCallback(
    ({ view, severity, msg }: ISnackBar) => {
      setSnackbarInfo({
        view,
        severity,
        msg,
      });
    },
    [],
  );

  const controlDialog = React.useCallback((view: IDialogUI) => {
    setIsVisibleDialog(view.view);
    setDialogTitle(view.title);
    setDialogContent(view.mainContent);
  }, []);

  const closeDialog = React.useCallback(() => {
    setIsVisibleDialog(false);
    setDialogContent(<></>);
    setDialogTitle('');
  }, []);

  const controlBackdrop = React.useCallback(({ view, content }: IBackdrop) => {
    setBackdrop({ view, content });
  }, []);

  const closeBackdrop = React.useCallback(() => {
    setBackdrop({
      view: false,
      content: <></>,
    });
  }, []);

  const changeDialogContent = React.useCallback(content => {
    setDialogContent(content);
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        controlBackdrop,
        closeBackdrop,
        backdrop,

        closeDialog,
        controlDialog,
        changeDialogContent,

        snackbarInfo,
        closeSnackbar,
        controlSnackbar,
      }}
    >
      <GlobalDialog
        dialogUI={{
          view: isVisibleDialog,
          title: dialogTitle,
          mainContent: dialogContent,
        }}
      />
      <GlobalSnackbar />
      <GlobalBackdrop />
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalLayout;
