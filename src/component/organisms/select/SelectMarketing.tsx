import React from 'react';
import { Controller } from 'react-hook-form';
import { MenuItem } from '@mui/material';
import { TextWithWrapper } from '~/src/component/molecules/wrapper';
import { IPropsWithAbleToSelect } from '~/src/component/organisms/fileterOptions';
import { SelectDropStyled } from '~/src/component/organisms/select/styles';

const SelectMarketing = ({
  control,
  isDisable = false,
}: IPropsWithAbleToSelect): JSX.Element => {
  return (
    <TextWithWrapper label="마켓팅 동의 여부">
      <Controller
        name="agreeMarketing"
        control={control}
        render={({ field }) => (
          <SelectDropStyled fullWidth disabled={isDisable} {...field}>
            <MenuItem value="entire">전체</MenuItem>
            <MenuItem value="agree">동의</MenuItem>
            <MenuItem value="disagree">미동의</MenuItem>
          </SelectDropStyled>
        )}
      />
    </TextWithWrapper>
  );
};

export default SelectMarketing;
