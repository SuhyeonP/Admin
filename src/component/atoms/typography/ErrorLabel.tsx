import React from 'react';
import { styled, Typography, TypographyProps } from '@mui/material';
import { ExtendOmit } from '~/src/util/types';

type IProps = ExtendOmit<TypographyProps>;

const ErrorLabelStyled = styled(Typography)`
  position: absolute;
  color: red;
  bottom: 5px;
`;

const ErrorLabel = ({ ...props }: IProps): JSX.Element => {
  return <ErrorLabelStyled {...props} />;
};

export default ErrorLabel;
