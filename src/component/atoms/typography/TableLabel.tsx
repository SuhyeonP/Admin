import { TypographyProps } from '@mui/material';
import React from 'react';
import { ExtendOmit } from '~/src/util/types/componentType';
import { BasicTitle } from '~/src/component/atoms';

type IProps = ExtendOmit<TypographyProps>;

const TableLabel = ({ ...props }: IProps): JSX.Element => {
  return (
    <>
      <BasicTitle
        fs="14px"
        weight={400}
        lh="16px"
        textOverflow="ellipsis"
        {...props}
      />
    </>
  );
};

export default TableLabel;
