import React from 'react';
import { Controller } from 'react-hook-form';
import { MenuItem } from '@mui/material';
import { TextWithWrapper } from '~/src/component/molecules/wrapper';
import { SelectDropStyled } from '~/src/component/molecules/select/styles';
import { ISelectedProps } from '~/src/util/types';
import EditInputValue from '~/src/component/molecules/info/EditInputValue';

interface IProps extends ISelectedProps {
  isDisabled?: boolean;
}

const SelectLicense = ({
  control,
  isDisabled = false,
}: IProps): JSX.Element => {
  return (
    <TextWithWrapper label="라이센스">
      <Controller
        name="license"
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
              <MenuItem value="free">무료</MenuItem>
            </SelectDropStyled>
          )
        }
      />
    </TextWithWrapper>
  );
};

export default SelectLicense;
