import React from 'react';
import { Button, Input, MenuItem, Select, styled } from '@mui/material';
import { Controller } from 'react-hook-form';
import { SelectWrapperStyled } from './styles';
import { TextWithWrapper } from '~/src/component/molecules/wrapper';
import { SearchIcon } from '~/src/asset/icons';
import { ISelectedProps } from '~/src/util/types';

export interface IProps extends ISelectedProps {
  isCompany?: boolean;
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

const InputStyled = styled(Input)`
  flex: 1;
  min-width: 200px;
  outline: 0;
  &:after,
  &:before {
    border-bottom: 0;
  }

  border: 0;
`;

const SelectSearch = ({ control, isCompany = false }: IProps): JSX.Element => {
  const [arrayValues, setArrayValues] = React.useState(
    isCompany ? companyValues : membersValues,
  );

  React.useEffect(() => {
    setArrayValues(isCompany ? companyValues : membersValues);
  }, [isCompany]);

  const makeBlur = React.useCallback(e => {
    if (e.keyCode === 13) {
      console.log('check');
    }
  }, []);

  return (
    <TextWithWrapper label="검색" sx={{ width: '100%' }}>
      <SelectWrapperStyled>
        <Controller
          name="search"
          control={control}
          render={({ field }) => (
            <Select {...field}>
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
            <InputStyled
              placeholder="Search..."
              value={field.value}
              onChange={field.onChange}
              onKeyDown={makeBlur}
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
