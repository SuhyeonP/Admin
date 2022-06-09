import { Grid, GridProps } from '@mui/material';
import React from 'react';
import { ExtendOmit } from '~/src/util/types';
import { IImgProps, Image } from '~/src/component/atoms';

interface IProps extends ExtendOmit<GridProps> {
  imgProps: IImgProps;
}

const ImageWrapper = ({ imgProps, ...props }: IProps): JSX.Element => {
  return (
    <Grid {...props}>
      <Image {...imgProps} />
    </Grid>
  );
};

export default ImageWrapper;
