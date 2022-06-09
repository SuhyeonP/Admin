import React from 'react';
import { Grid, TypographyProps } from '@mui/material';
import { BasicTitle } from '~/src/component/atoms';
import { ExtendOmit } from '~/src/util/types';

interface IProps extends ExtendOmit<TypographyProps> {
  innerPadding?: string;
}

const SubTitle = ({
  innerPadding = '0 16px 0 0',
  ...props
}: IProps): JSX.Element => {
  return (
    <Grid container p={innerPadding}>
      <BasicTitle fs="20px" weight={700} lh="23px" {...props} />
    </Grid>
  );
};

export default SubTitle;
