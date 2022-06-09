import React from 'react';
import { styled, Typography, TypographyProps } from '@mui/material';
import { ExtendOmit } from '~/src/util/types';

type IProps = ExtendOmit<TypographyProps>;

const TitleStyled = styled(Typography)`
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 28px;
  text-align: center;

  color: #000000;
  display: inline-block;

  /* Inside auto layout */
`;

const Title = ({ ...props }: IProps): JSX.Element => {
  return <TitleStyled {...props} />;
};

export default Title;
