import React from 'react';
import { DialogContent, DialogContentProps } from '@mui/material';
import { ExtendOmit } from '~/model/common';

interface IProps extends ExtendOmit<DialogContentProps> {
  children: React.ReactNode;
}

const DialogContentLayout = ({ children, ...props }: IProps): JSX.Element => {
  return (
    <DialogContent sx={{ m: 2 }} {...props}>
      {children}
    </DialogContent>
  );
};

export default DialogContentLayout;
