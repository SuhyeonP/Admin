import React from 'react';
import { Button, ButtonProps, styled } from '@mui/material';
import { colorPalette } from 'marketing/style/color';
export type TrueFalseString = 'true' | 'false';
export type ExtendOmit<T> = Omit<T, 'type'>;

interface IBtnStyled {
  is_right?: boolean;
  btn_size?: string;
}

interface IBtnStyleProps {
  is_right: TrueFalseString;
  btn_size?: string;
}

type IProps = ExtendOmit<ButtonProps> & IBtnStyled;

const DoubleBtnStyled = styled(Button)(({ is_right }: IBtnStyleProps) => {
  const common = `
    border: 1px solid ${colorPalette.background_gray};
    border-radius: 4px;
    height: 36px;
    padding: 10px 16px;
    
    align-items: center;
    
    text-overflow: ellipsis;
    white-space: nowrap;
    
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    text-transform: none;
  `;

  if (is_right === 'true') {
    return `
      ${common};
      background-color: ${colorPalette.background_gray};
      color: ${colorPalette.default_white};
    `;
  } else {
    return `
      ${common};
      background-color: ${colorPalette.default_white};
      color: ${colorPalette.background_gray};
    `;
  }
});

const DoubleButton = ({ is_right = false, ...props }: IProps): JSX.Element => {
  return (
    <DoubleBtnStyled
      fullWidth
      is_right={is_right.toString() as TrueFalseString}
      {...props}
    />
  );
};

export default React.memo(DoubleButton);
