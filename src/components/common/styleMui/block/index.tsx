import React from 'react';
import { Grid, GridProps, styled as muiStyled } from '@mui/material';
import { ExtendOmit } from '~/model/common';

interface IProps extends ExtendOmit<GridProps> {
  children: React.ReactNode;
  type?: string;
}

const RegisterBlock = muiStyled(Grid)({
  '&.MuiGrid-root': {
    margin: '10px 0',
  },
});

const Block = ({
  children,
  type = 'register',
  ...props
}: IProps): JSX.Element => {
  if (type === 'register') {
    return <RegisterBlock {...props}>{children}</RegisterBlock>;
  }

  return <Grid {...props}>{children}</Grid>;
};

export default Block;
