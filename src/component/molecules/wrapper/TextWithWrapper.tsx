import React from 'react';
import { BoxProps, Grid } from '@mui/material';
import { InputTitle } from '~/src/component/atoms';
import { ExtendOmit } from '~/src/util/types';
import { SelectBoxStyled } from '~/src/component/molecules/select/styles';

interface IProps extends ExtendOmit<BoxProps> {
  label?: string;
}

const TextWithWrapper = ({ label, ...props }: IProps): JSX.Element => {
  return (
    <SelectBoxStyled {...props}>
      {label && <InputTitle>{label}</InputTitle>}
      <Grid container>{props.children}</Grid>
    </SelectBoxStyled>
  );
};

export default TextWithWrapper;
