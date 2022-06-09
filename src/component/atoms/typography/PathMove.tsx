import React from 'react';
import { TypographyProps } from '@mui/material';
import { defaultBlack } from '~/src/component/style/color';
import { ExtendOmit } from '~/src/util/types';
import { BasicTitle } from '~/src/component/atoms';

interface IProps extends ExtendOmit<TypographyProps> {
  now: boolean;
}
//  padding: 12px 24px;

const PathMove = ({ now, ...props }: IProps): JSX.Element => {
  return (
    <>
      <BasicTitle
        fs="16px"
        weight={900}
        lh="16px"
        fc={now ? defaultBlack : defaultBlack}
        p="12px 24px"
        {...props}
      />
    </>
  );
};

export default PathMove;
