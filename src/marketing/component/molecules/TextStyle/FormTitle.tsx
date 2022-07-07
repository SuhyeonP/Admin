import React from 'react';
import Text, { FontWeightValue } from 'marketing/component/atom/Text';
import { colorPalette } from 'marketing/style/color';

interface IProps {
  children: string | number;
  fw?: FontWeightValue;
}

const FormTitle = ({ children, fw = 'regular' }: IProps): JSX.Element => {
  return (
    <Text
      color={colorPalette.title_gray}
      fontWeight={fw}
      lineHeight="14px"
      fontSize="12px"
    >
      {children}
    </Text>
  );
};

export default FormTitle;
