import React from 'react';
import { Controller } from 'react-hook-form';
import { MenuItem } from '@mui/material';
import { SelectDropStyled } from '~/src/component/organisms/select/styles';
import { TextWithWrapper } from '~/src/component/molecules/wrapper';
import { ISelectedProps } from '~/src/util/types';

interface IProps extends ISelectedProps {
  isDisabled?: boolean;
  members: any[];
}

const SelectAdmin = ({ control, isDisabled, members }: IProps): JSX.Element => {
  return (
    <TextWithWrapper label="관리자">
      <Controller
        name="admin"
        control={control}
        render={({ field }) => (
          <SelectDropStyled fullWidth {...field} disabled={isDisabled}>
            {members.map(member => (
              <MenuItem key={member.name} value={member.id}>
                {member.name}
              </MenuItem>
            ))}
          </SelectDropStyled>
        )}
      />
    </TextWithWrapper>
  );
};

export default SelectAdmin;
