import React from 'react';
import { Box, Grid, GridProps, styled } from '@mui/material';
import { ExtendOmit } from '~/src/util/types';

interface IProps extends ExtendOmit<GridProps> {
  leftBtn?: React.ReactElement;
  rightBtn: React.ReactElement;
}

const BtnWrapperStyled = styled(Box)`
  display: inline-block;
`;

const DoubleButtonWrapper = ({
  leftBtn,
  rightBtn,
  ...props
}: IProps): JSX.Element => {
  return (
    <Grid container justifyContent="right" alignItems="center" {...props}>
      {leftBtn !== undefined && (
        <BtnWrapperStyled mr="8px">{leftBtn}</BtnWrapperStyled>
      )}
      <BtnWrapperStyled>{rightBtn}</BtnWrapperStyled>
    </Grid>
  );
};

export default DoubleButtonWrapper;

//<DoubleButtonWrapper
//         rightBtn={
//           <DoubleButton isRight btnSize="58px">
//             test
//           </DoubleButton>
//         }
//       />
