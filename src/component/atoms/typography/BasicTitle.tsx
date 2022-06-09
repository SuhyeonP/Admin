import React from 'react';
import { styled, Typography, TypographyProps } from '@mui/material';
import { defaultBlack } from '~/src/component/style/color';
import { ExtendOmit } from '~/src/util/types';

interface IFontStyledProps {
  fs: string;
  weight: string | number;
  lh: string;
  fc?: string;
}

type IProps = IFontStyledProps & ExtendOmit<TypographyProps>;

const TitleStyled = styled(Typography)(
  ({ fs, weight, lh, fc = defaultBlack }: IFontStyledProps) => {
    const common = `
        font-size: ${fs};
        font-weight: ${weight};
        
        color: ${fc};
        
        line-height: ${lh} 
    `;

    return `${common};`;
  },
);

const BasicTitle = ({
  fs,
  weight,
  lh,
  fc = defaultBlack,
  ...props
}: IProps): JSX.Element => {
  return <TitleStyled fs={fs} weight={weight} lh={lh} fc={fc} {...props} />;
};

export default BasicTitle;
