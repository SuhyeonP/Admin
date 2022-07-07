import React from 'react';
import { css } from '@emotion/react';
import Text from 'marketing/component/atom/Text';
import { colorPalette } from 'marketing/style/color';

interface IProps {
  dates: string[];
}

const DateRangeText = ({ dates }: IProps): JSX.Element => {
  const [start_date, end_date] = dates;

  return (
    <Text
      color={colorPalette.background_gray}
      fontSize="14px"
      lineHeight="16px"
      css={css`
        font-weight: 400;
      `}
    >
      {start_date} ~ {end_date}
    </Text>
  );
};

export default DateRangeText;
