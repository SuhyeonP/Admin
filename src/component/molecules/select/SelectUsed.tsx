import React from 'react';
import { Controller } from 'react-hook-form';
import { MenuItem } from '@mui/material';
import TextWithWrapper from '../wrapper/TextWithWrapper';
import { SelectDropStyled } from '~/src/component/molecules/select/styles';
import { IPropsWithAbleToSelect } from '~/src/util/types';

const SelectUsed = ({
  control,
  isDisable = false,
}: IPropsWithAbleToSelect): JSX.Element => {
  return (
    <TextWithWrapper label="제품 사용 여부">
      <Controller
        name="using"
        control={control}
        render={({ field }): any => (
          <SelectDropStyled fullWidth {...field} disabled={isDisable}>
            <MenuItem value="entire">전체</MenuItem>
            <MenuItem value="used">사용</MenuItem>
            <MenuItem value="unused">미사용</MenuItem>
          </SelectDropStyled>
        )}
      />
    </TextWithWrapper>
  );
};

export default SelectUsed;
