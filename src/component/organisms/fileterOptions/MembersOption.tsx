import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { Grid } from '@mui/material';
import { SelectContainerStyled } from './style';
import {
  SelectDateRange,
  SelectMarketing,
  SelectPlan,
  SelectSearch,
  SelectUsed,
} from '~/src/component/organisms/select';
import { dateRange } from '~/src/util';
import {
  AgreeOrDisagree,
  IDateRangeProps,
  ISearchProps,
  ISelectedProps,
  Plan,
  UseLink,
} from '~/src/util/types';

export interface IGetSelected extends IDateRangeProps, ISearchProps {
  plan: Plan;
  using: 'entire' | UseLink;
  agreeMarketing: 'entire' | AgreeOrDisagree;
}

export interface IPropsWithAbleToSelect extends ISelectedProps {
  isDisable?: boolean;
}

const MembersOption = (): JSX.Element => {
  const { handleSubmit, control, watch, setValue } = useForm<IGetSelected>({
    defaultValues: {
      selectDateRange: 'memberCreated',
      plan: 'entire',
      using: 'entire',
      agreeMarketing: 'entire',
      pickDateRange: dateRange['user'],
      period: 'entire',
      search: 'email',
      searchInput: '',
    },
  });

  React.useEffect(() => {
    if (watch('selectDateRange') === 'lastUsed') {
      setValue('using', 'used');
    } else if (watch('selectDateRange') === 'lastAgreeMarketing') {
      setValue('agreeMarketing', 'agree');
    }
  }, [watch('selectDateRange')]);

  const onSubmit = useCallback((data: IGetSelected) => {
    console.log(data.search);
    console.log(data.searchInput);
  }, []);

  return (
    <SelectContainerStyled onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item>
          <SelectDateRange control={control} setValue={setValue} />
        </Grid>
        <Grid item xs={1.5}>
          <SelectPlan control={control} />
        </Grid>
        <Grid item xs={1.5}>
          <SelectUsed
            isDisable={watch('selectDateRange') === 'lastUsed'}
            control={control}
          />
        </Grid>
        <Grid item xs={1.5}>
          <SelectMarketing
            control={control}
            isDisable={watch('selectDateRange') === 'lastAgreeMarketing'}
          />
        </Grid>
        <Grid item sx={{ flex: 1 }}>
          <SelectSearch control={control} />
        </Grid>
      </Grid>
    </SelectContainerStyled>
  );
};

export default MembersOption;
