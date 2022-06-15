import React from 'react';
import { Controller } from 'react-hook-form';
import { MenuItem } from '@mui/material';
import { TextWithWrapper } from '~/src/component/molecules/wrapper';
import { SelectDropStyled } from '~/src/component/molecules/select/styles';
import { ISelectedProps } from '~/src/util/types';
import EditInputValue from '~/src/component/molecules/info/EditInputValue';

interface IProps extends ISelectedProps {
  isRegister?: boolean;
  isDisabled?: boolean;
  isCompany?: boolean;
}

const SelectPlan = ({
  control,
  isRegister = false,
  isDisabled = false,
  isCompany = false,
}: IProps): JSX.Element => {
  return (
    <TextWithWrapper label="플랜">
      <Controller
        name="plan"
        control={control}
        render={({ field }) =>
          isDisabled ? (
            <EditInputValue editable={false} value={field.value} />
          ) : (
            <SelectDropStyled
              fullWidth
              value={field.value}
              onChange={field.onChange}
              disabled={isDisabled}
            >
              {!isRegister && <MenuItem value="entire">전체</MenuItem>}
              {!isCompany && <MenuItem value="community">Community</MenuItem>}
              <MenuItem value="enterprise">Enterprise</MenuItem>
            </SelectDropStyled>
          )
        }
      />
    </TextWithWrapper>
  );
};

export default SelectPlan;
