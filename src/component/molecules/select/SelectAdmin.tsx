import React from 'react';
import { Controller } from 'react-hook-form';
import { MenuItem } from '@mui/material';
import { SelectDropStyled } from '~/src/component/molecules/select/styles';
import { TextWithWrapper } from '~/src/component/molecules/wrapper';
import { ISelectedProps } from '~/src/util/types';
import { EditInputValue } from '~/src/component/molecules/info';

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
        render={({ field }) =>
          isDisabled ? (
            <>
              <EditInputValue editable={false} value={field.value} />
            </>
          ) : (
            <SelectDropStyled fullWidth {...field} disabled={isDisabled}>
              {members.map(member => (
                <MenuItem key={member.name} value={member.id}>
                  {member.name}
                </MenuItem>
              ))}
            </SelectDropStyled>
          )
        }
      />
    </TextWithWrapper>
  );
};

export default SelectAdmin;
