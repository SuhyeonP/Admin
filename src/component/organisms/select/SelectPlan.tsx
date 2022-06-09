import React from 'react';
import { Controller } from 'react-hook-form';
import { MenuItem } from '@mui/material';
import { TextWithWrapper } from '~/src/component/molecules/wrapper';
import { SelectDropStyled } from '~/src/component/organisms/select/styles';
import { ISelectedProps } from '~/src/util/types';

interface IProps extends ISelectedProps {
  isRegister?: boolean;
  isDisabled?: boolean;
}

const SelectPlan = ({
  control,
  isRegister = false,
  isDisabled = false,
}: IProps): JSX.Element => {
  return (
    <TextWithWrapper label="플랜">
      <Controller
        name="plan"
        control={control}
        render={({ field }) => (
          <SelectDropStyled
            fullWidth
            value={field.value}
            onChange={field.onChange}
            disabled={isDisabled}
          >
            {!isRegister && <MenuItem value="entire">전체</MenuItem>}
            <MenuItem value="community">Community</MenuItem>
            <MenuItem value="enterprise">Enterprise</MenuItem>
          </SelectDropStyled>
        )}
      />
    </TextWithWrapper>
  );
};

export default SelectPlan;
