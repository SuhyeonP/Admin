import React from 'react';
import { useForm } from 'react-hook-form';
import { Grid } from '@mui/material';
import { IDateRangeProps, ISearchProps } from '~/src/util/types';
import { dateRange } from '~/src/util';
import {
  SelectDateRange,
  SelectSearch,
} from '~/src/component/molecules/select';
import { FormStyled } from '~/src/globalStyles';

const CompanyOption = (): JSX.Element => {
  const { control, setValue, handleSubmit, watch } = useForm<
    IDateRangeProps & ISearchProps
  >({
    defaultValues: {
      selectDateRange: 'companyCreated',
      pickDateRange: dateRange['today'],
      search: 'companyName',
      searchInput: '',
    },
  });

  const submit = React.useCallback((data: IDateRangeProps & ISearchProps) => {
    console.log(data.search);
    console.log(data.searchInput);
  }, []);

  return (
    <FormStyled onSubmit={handleSubmit(submit)}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <SelectDateRange
            setValue={setValue}
            control={control}
            isCompany
            origin={watch('pickDateRange')}
          />
        </Grid>
        <Grid item xs={6}>
          <SelectSearch control={control} isCompany />
        </Grid>
      </Grid>
    </FormStyled>
  );
};

export default CompanyOption;
