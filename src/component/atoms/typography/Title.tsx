import React from 'react';
import { styled, Typography, TypographyProps } from '@mui/material';
import { ExtendOmit } from '~/src/util/types';

type IProps = ExtendOmit<TypographyProps>;

const TitleStyled = styled(Typography)`
  display: inline-block;

  color: #000000;
  font-weight: 700;
  font-size: 24px;
  font-style: normal;
  line-height: 28px;
  text-align: center;

  /* Inside auto layout */
`;

const Title = ({ ...props }: IProps): JSX.Element => {
  return <TitleStyled {...props} />;
};

export default Title;
