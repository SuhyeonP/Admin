import React from 'react';
import { Grid, GridProps } from '@mui/material';
import { ExtendOmit } from '~/src/util/types';

interface IProps extends ExtendOmit<GridProps> {
  customSpace?: number;
  leftElement?: React.ReactElement;
  rightElement: React.ReactElement;
}

const DivideSide = ({
  customSpace = 4,
  leftElement,
  rightElement,
  ...props
}: IProps): JSX.Element => {
  return (
    <Grid className="divide-group" container spacing={customSpace} {...props}>
      {leftElement && (
        <Grid item xs={6}>
          {leftElement}
        </Grid>
      )}
      <Grid item xs={leftElement ? 6 : 12}>
        {rightElement}
      </Grid>
    </Grid>
  );
};

export default DivideSide;
