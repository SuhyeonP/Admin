import React from 'react';
import { Button, ButtonProps, styled } from '@mui/material';
import { ExtendOmit, TrueFalseString } from '~/src/util/types';
import { defaultBlack, defaultWhite } from '~/src/component/style/color';

interface IBtnStyled {
  is_right?: boolean;
  btn_size?: string;
}

interface IBtnStyleProps {
  is_right: TrueFalseString;
  btn_size?: string;
}

type IProps = ExtendOmit<ButtonProps> & IBtnStyled;

const DoubleBtnStyled = styled(Button)(
  ({ is_right, btn_size }: IBtnStyleProps) => {
    const common = `
    border: 1px solid ${defaultBlack};
    border-radius: 4px;
    width: ${btn_size};
    min-width: ${btn_size};
    height: 36px;
    padding: 0;
    
    align-items: center;
    
    text-overflow: ellipsis;
    white-space: nowrap;
    
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
  `;

    if (is_right === 'true') {
      return `
      ${common};
      background-color: ${defaultBlack};
      color: ${defaultWhite};
    `;
    } else {
      return `
      ${common};
      background-color: ${defaultWhite};
      color: ${defaultBlack};
    `;
    }
  },
);

const DoubleButton = ({
  is_right = false,
  btn_size = '103px',
  ...props
}: IProps): JSX.Element => {
  return (
    <DoubleBtnStyled
      fullWidth
      is_right={is_right.toString() as TrueFalseString}
      btn_size={btn_size}
      {...props}
    />
  );
};

export default React.memo(DoubleButton);
