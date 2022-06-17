import React from 'react';
import { Backdrop } from '@mui/material';
import { GlobalContext } from '~/model/globalModel';

const GlobalBackdrop = (): JSX.Element => {
  const { backdrop, closeBackdrop } = React.useContext(GlobalContext);

  return (
    <>
      {backdrop.view && (
        <Backdrop
          open={backdrop.view}
          sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}
          onClick={closeBackdrop}
        >
          {backdrop.content}
        </Backdrop>
      )}
    </>
  );
};

export default GlobalBackdrop;
