import React from 'react';
import { Button, MenuItem, Select, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import { SelectWrapperStyled } from './styles';
import { TextWithWrapper } from '~/src/component/molecules/wrapper';
import { SearchIcon } from '~/src/asset/icons';
import { ISelectedProps } from '~/src/util/types';

export interface IProps extends ISelectedProps {
  isCompany?: boolean;
  hiddenLabel?: boolean;
}

const companyValues = [
  {
    label: '기업명',
    value: 'companyName',
  },
];

const membersValues = [
  {
    label: '이메일',
    value: 'email',
  },
  {
    label: '성명',
    value: 'fullName',
  },
];

const SelectSearch = ({
  control,
  isCompany = false,
  hiddenLabel = false,
}: IProps): JSX.Element => {
  const [arrayValues, setArrayValues] = React.useState(
    isCompany ? companyValues : membersValues,
  );

  React.useEffect(() => {
    setArrayValues(isCompany ? companyValues : membersValues);
  }, [isCompany]);

  return (
    <TextWithWrapper
      label={hiddenLabel ? undefined : '검색'}
      sx={{ width: '100%' }}
    >
      <SelectWrapperStyled>
        <Controller
          name="search"
          control={control}
          render={({ field }) => (
            <Select className="select-search-dropdown" {...field}>
              {arrayValues.map(ele => (
                <MenuItem key={ele.value} value={ele.value}>
                  {ele.label}
                </MenuItem>
              ))}
            </Select>
          )}
        />
        <Controller
          name="searchInput"
          control={control}
          render={({ field }) => (
            <TextField
              placeholder="Search..."
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        <Button className="inner-button" type="submit">
          <SearchIcon />
        </Button>
      </SelectWrapperStyled>
    </TextWithWrapper>
  );
};

export default SelectSearch;
