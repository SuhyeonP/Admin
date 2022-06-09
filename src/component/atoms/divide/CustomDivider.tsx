import React from 'react';
import { Divider, DividerProps } from '@mui/material';
import { ExtendOmit } from '~/src/util/types';

type IProps = ExtendOmit<DividerProps>;

const CustomDivider = ({ ...props }: IProps): JSX.Element => {
  return <Divider {...props} />;
};

export default CustomDivider;
