import React from 'react';
import { DialogActions, DialogActionsProps, Grid } from '@mui/material';
import { ExtendOmit } from '~/model/common';

interface IProps extends ExtendOmit<DialogActionsProps> {
  children: React.ReactNode;
}

const DialogActionLayout = ({ children, ...props }: IProps): JSX.Element => {
  return (
    <DialogActions {...props}>
      <Grid container justifyContent="center">
        {children}
      </Grid>
    </DialogActions>
  );
};

export default DialogActionLayout;
