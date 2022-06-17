import React from 'react';
import { useInput } from 'custom-hook-react';
import { Box, Button, TextField } from '@mui/material';
import { ICustomerDataProps } from '~/model/store';

const SearchForm = ({
  settingCustomersDetail,
  sorting,
}: ICustomerDataProps): JSX.Element => {
  const [search, onChangeSearch, setSearch] = useInput<string>(
    sorting.search || '',
  );

  const checkSubmit = React.useCallback(
    e => {
      e.preventDefault();

      const temp = {
        ...sorting,
      };

      if (search !== '') {
        temp['search'] = search;
      } else {
        if (temp.search) {
          delete temp['search'];
        }
      }
      settingCustomersDetail(temp);
    },
    [sorting, search],
  );

  const submitSearchHelper = React.useCallback(
    e => {
      if (e.keyCode === 13) {
        checkSubmit(e);
      }
    },
    [search],
  );

  return (
    <Box display="flex" alignItems="center" width="70%">
      <TextField
        value={search}
        onChange={onChangeSearch}
        placeholder="관리자명, 관리자 이메일, 소속명 검색"
        size="small"
        onKeyDown={submitSearchHelper}
        sx={{ width: '80%', mr: 3 }}
      />
      <Button variant="outlined" onClick={checkSubmit}>
        Search
      </Button>
    </Box>
  );
};

export default SearchForm;
