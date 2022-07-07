import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { InformIcon } from '~/shared/asset/icon';
import Text from 'marketing/component/atom/Text';
import { colorPalette } from 'marketing/style/color';

const InformWrapperStyled = styled.div`
  display: flex;
  align-items: center;

  padding-bottom: 10px;

  &:last-child {
    padding: 0;
  }
`;

interface IProps {
  content: string | number;
}

const InformContent = ({ content }: IProps): JSX.Element => {
  return (
    <InformWrapperStyled>
      <InformIcon
        css={css`
          margin-right: 5.17px;
          width: 14px;
          height: 14px;
        `}
      />
      <Text
        fontSize="12px"
        lineHeight="14px"
        color={colorPalette.background_gray}
      >
        {content}
      </Text>
    </InformWrapperStyled>
  );
};
export default InformContent;
