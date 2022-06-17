import React from 'react';
import { Alert, Snackbar } from '@mui/material';
import { GlobalContext } from '~/model/globalModel';

const GlobalSnackbar = (): JSX.Element => {
  const { snackbarInfo, closeSnackbar: close } =
    React.useContext(GlobalContext);

  const closeSnackbar = React.useCallback(
    (e: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickway') {
        return;
      }
      close();
    },
    [],
  );

  return (
    <>
      {snackbarInfo.view && (
        <Snackbar
          open={snackbarInfo.view}
          onClose={closeSnackbar}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert severity={snackbarInfo.severity}>{snackbarInfo.msg}</Alert>
        </Snackbar>
      )}
    </>
  );
};

export default GlobalSnackbar;
