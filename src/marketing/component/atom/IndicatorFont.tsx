import React from 'react';
import BasicTitle from 'marketing/component/atom/BasicTitle';
import { colorPalette } from 'marketing/style/color';

interface IProps {
  children: string | number;
}

const IndicatorFont = ({ children }: IProps): JSX.Element => {
  return (
    <BasicTitle
      fs="14px"
      weight={400}
      lh="16px"
      fc={colorPalette.background_gray}
    >
      {children}
    </BasicTitle>
  );
};

export default IndicatorFont;
