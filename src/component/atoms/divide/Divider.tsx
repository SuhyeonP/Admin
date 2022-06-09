import React from 'react';
import styled from '@emotion/styled';
import { subGray } from '~/src/component/style/color';

const DividerStyled = styled.p`
  width: 100%;
  height: 1px;

  margin: 40px 0 16px;

  background-color: ${subGray};
`;

const Divider = (): JSX.Element => {
  return <DividerStyled />;
};

export default Divider;
