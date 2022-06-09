import React from 'react';
import { Controller } from 'react-hook-form';
import { MenuItem } from '@mui/material';
import { TextWithWrapper } from '~/src/component/molecules/wrapper';
import { SelectDropStyled } from '~/src/component/organisms/select/styles';
import { ISelectedProps } from '~/src/util/types';

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
        render={({ field }) => (
          <SelectDropStyled
            fullWidth
            value={field.value}
            onChange={field.onChange}
            disabled={isDisabled}
          >
            <MenuItem value="free">무료</MenuItem>
          </SelectDropStyled>
        )}
      />
    </TextWithWrapper>
  );
};

export default SelectLicense;
