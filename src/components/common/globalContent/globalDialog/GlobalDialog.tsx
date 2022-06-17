import React from 'react';
import { Dialog, DialogTitle, styled as muiStyled } from '@mui/material';
import { IDialogUI } from '~/model/store';
import { GlobalContext } from '~/model/globalModel';

interface IProps {
  dialogUI: IDialogUI;
}

const DialogStyle = muiStyled(Dialog)({
  '&.MuiDialog-root': {
    boxShadow: '4px 4px 20px rgba(0, 0, 0, 0.25)',
    borderRadius: '20px',
  },
});

const GlobalDialog = ({ dialogUI }: IProps): JSX.Element => {
  const { closeDialog } = React.useContext(GlobalContext);

  return (
    <DialogStyle open={dialogUI.view} onClose={closeDialog} maxWidth="md">
      <DialogTitle
        sx={{
          fontWeight: 700,
          color: '#464555',
          m: 2,
        }}
      >
        {dialogUI.title}
      </DialogTitle>
      {dialogUI.mainContent}
    </DialogStyle>
  );
};

export default GlobalDialog;
