import React from 'react';
import { Dialog } from '@mui/material';
import { useAppSelector } from '~/src/redux/hook';

const CustomDialog = (): JSX.Element => {
  const { dialogVisible, element, dialogSize } = useAppSelector(
    state => state.global,
  );

  return (
    <Dialog open={dialogVisible} maxWidth={dialogSize}>
      {element}
    </Dialog>
  );
};

export default CustomDialog;
