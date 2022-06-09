import React from 'react';
import { BoxProps, Grid } from '@mui/material';
import { InputTitle } from '~/src/component/atoms';
import { ExtendOmit, IChildren } from '~/src/util/types';
import { SelectBoxStyled } from '~/src/component/organisms/select/styles';

interface IProps extends IChildren, ExtendOmit<BoxProps> {
  label: string;
}

const TextWithWrapper = ({
  label,
  children,
  ...props
}: IProps): JSX.Element => {
  return (
    <SelectBoxStyled {...props}>
      <InputTitle>{label}</InputTitle>
      <Grid container>{children}</Grid>
    </SelectBoxStyled>
  );
};

export default TextWithWrapper;
