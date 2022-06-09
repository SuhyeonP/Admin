import React from 'react';
import { Grid, GridProps } from '@mui/material';
import { ExtendOmit } from '~/src/util/types';

type IProps = ExtendOmit<GridProps>;

const CustomGrid = ({ ...props }: IProps): JSX.Element => {
  return <Grid {...props} />;
};

export default CustomGrid;
