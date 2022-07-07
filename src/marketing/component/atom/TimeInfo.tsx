import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { TimeIcon } from '~/shared/asset/icon';
import Text from 'marketing/component/atom/Text';
import { colorPalette } from 'marketing/style/color';

const TimeInfoStyled = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  margin-top: 40px;
  margin-bottom: 24px;
`;

interface IProps {
  time: string;
}

const TimeInfo = ({ time }: IProps): JSX.Element => {
  return (
    <TimeInfoStyled>
      <TimeIcon
        css={css`
          margin-right: 5px;
        `}
      />
      <Text fontSize="12px" lineHeight="14px" color={colorPalette.title_gray}>
        {time} 조회 데이터 기준
      </Text>
    </TimeInfoStyled>
  );
};

export default TimeInfo;
