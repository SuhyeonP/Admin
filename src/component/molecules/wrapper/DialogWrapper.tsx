import React from 'react';
import {
  DialogActions,
  DialogContent,
  DialogContentProps,
  DialogTitle,
} from '@mui/material';

interface IProps {
  title?: string;
  content: DialogContentProps;
  actions?: React.ReactElement;
}

const DialogWrapper = ({ title, content, actions }: IProps): JSX.Element => {
  return (
    <>
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent {...content} />
      {actions && <DialogActions>{actions}</DialogActions>}
    </>
  );
};

export default DialogWrapper;
