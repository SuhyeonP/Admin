import React from 'react';
import { Grid } from '@mui/material';
import { DoubleButton } from '~/src/component/atoms';

interface IProps {
  leftBtnLabel?: string;
  leftBtnClick?: () => void;
  leftBtnSize?: string;

  rightBtnZone: React.ReactElement;
}

const UnderBtn = ({
  leftBtnSize = '113px',
  leftBtnLabel,
  leftBtnClick,
  rightBtnZone,
}: IProps): JSX.Element => {
  return (
    <Grid
      container
      sx={{
        justifyContent:
          leftBtnLabel !== undefined ? 'space-between' : 'flex-end',
      }}
    >
      {leftBtnLabel && leftBtnClick && (
        <Grid item>
          <DoubleButton is_right onClick={leftBtnClick} btn_size={leftBtnSize}>
            {leftBtnLabel}
          </DoubleButton>
        </Grid>
      )}
      <Grid item>{rightBtnZone}</Grid>
    </Grid>
  );
};

export default UnderBtn;
