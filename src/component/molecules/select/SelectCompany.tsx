import React from 'react';
import {
  Autocomplete,
  TextField,
  styled as muiStyled,
  Grid,
} from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import TextWithWrapper from '~/src/component/molecules/wrapper/TextWithWrapper';
import { SelectWrapperStyled } from '~/src/component/molecules/select/styles';

const dummy = [
  {
    name: 'sdf',
  },
  {
    name: 'ssss',
  },
];

const AdminUserListStyled = muiStyled(Grid)`
  width: 100%;
  
  .MuiAutocomplete-root {
    width: 100%;
    height: 100%;
    
    & > .MuiFormControl-root {
      width: 100%;
      height: 100%;
      
      .MuiInputBase-root {
        padding: 0 0 0 14px;
      }
    }
  }
`;

interface IProps {
  control: Control<any, any>;
}

const SelectCompany = ({ control }: IProps): JSX.Element => {
  return (
    <TextWithWrapper label="기업">
      <SelectWrapperStyled>
        <Controller
          name="company"
          control={control}
          render={({ field }) => (
            <AdminUserListStyled>
              <Autocomplete
                disablePortal
                id="company-select"
                options={dummy}
                getOptionLabel={(option: any) => option.name}
                defaultValue={field.value}
                sx={{ width: 300 }}
                renderInput={params => <TextField {...params} />}
              />
            </AdminUserListStyled>
          )}
        />
      </SelectWrapperStyled>
    </TextWithWrapper>
  );
};

export default SelectCompany;
