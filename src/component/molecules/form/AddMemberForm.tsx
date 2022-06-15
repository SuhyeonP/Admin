import React from 'react';
import { Grid } from '@mui/material';
import { Control } from 'react-hook-form';
import { BoxStyled, GroupStyled } from '~/src/globalStyles';
import { EditInputValue } from '~/src/component/molecules/info';
import {
  SelectJobs,
  SelectLicense,
  SelectPlan,
} from '~/src/component/molecules/select';
import { DivideSide } from '~/src/component/molecules/wrapper';
import SelectCompany from '~/src/component/molecules/select/SelectCompany';

interface IProps {
  control: Control<any, any>;
  isContain?: boolean;
  planValue?: string;
}

const AddMemberForm = ({
  control,
  isContain = false,
  planValue,
}: IProps): JSX.Element => {
  return (
    <BoxStyled>
      <GroupStyled container>
        <EditInputValue
          editable
          label="이메일"
          name="email"
          control={control}
        />
      </GroupStyled>
      <GroupStyled container spacing={4}>
        <Grid item xs={6}>
          <EditInputValue
            editable
            label="이름"
            name="first_name"
            control={control}
          />
        </Grid>
        <Grid item xs={6}>
          <EditInputValue
            editable
            label="성"
            name="last_name"
            control={control}
          />
        </Grid>
      </GroupStyled>
      {!isContain && (
        <GroupStyled container spacing={4}>
          <Grid item xs={6}>
            <SelectPlan control={control} isRegister />
          </Grid>
          <Grid item xs={6}>
            {planValue && planValue === 'enterprise' ? (
              <SelectCompany control={control} />
            ) : (
              <SelectLicense control={control} />
            )}
          </Grid>
        </GroupStyled>
      )}
      <DivideSide
        rightElement={<SelectJobs control={control} />}
        leftElement={
          !isContain ? (
            <EditInputValue
              editable
              label="소속"
              name="belong"
              control={control}
            />
          ) : undefined
        }
      />
    </BoxStyled>
  );
};

export default AddMemberForm;
