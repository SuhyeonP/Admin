import React from 'react';
import { Checkbox, FormControlLabel, styled as muiStyled } from '@mui/material';
import { UseFormRegisterReturn } from 'react-hook-form/dist/types/form';
import Text from 'marketing/component/atom/Text';
import { colorPalette } from 'marketing/style/color';

const UniqueCheckStyled = muiStyled(FormControlLabel)`
  margin-left: 19px;
  .MuiCheckbox-root {
    padding: 0;
    margin-right: 6px;
  }
  
  .check-unique {
    margin-right: 4px;
    svg {
        width: 16px;
        height: 16px;
    }
  }
`;

interface IProps {
  register: UseFormRegisterReturn<any>;
}

const UniqueCheck = ({ register }: IProps): JSX.Element => {
  return (
    <UniqueCheckStyled
      control={<Checkbox className="check-unique" {...register} />}
      label={
        <Text fontSize="14px" lineHeight="16px" color={colorPalette.title_gray}>
          Unique
        </Text>
      }
    />
  );
};
export default UniqueCheck;
