import React from 'react';
import { DialogActions, DialogContent, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import { BoxStyled, GroupStyled } from './style';
import { IRegisterMemberInfo } from '~/src/util/types';
import { DoubleButton } from '~/src/component/atoms';
import { DoubleButtonWrapper } from '~/src/component/molecules/wrapper';
import {
  SelectJobs,
  SelectLicense,
  SelectPlan,
} from '~/src/component/organisms/select';
import { globalActions } from '~/src/redux/slice';
import { useAppDispatch } from '~/src/redux/hook';
import { EditInputValue } from '~/src/component/molecules/info';

const RegisterMember = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const { control } = useForm<IRegisterMemberInfo>({
    defaultValues: {
      plan: 'community',
      license: 'free',
      job_title: 'Data_Analyst',
    },
  });

  const close = React.useCallback(() => {
    dispatch(globalActions.closeDialog());
  }, []);

  return (
    <>
      <DialogContent>
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
          <GroupStyled container spacing={4}>
            <Grid item xs={6}>
              <SelectPlan control={control} isRegister />
            </Grid>
            <Grid item xs={6}>
              <SelectLicense control={control} />
            </Grid>
          </GroupStyled>
          <GroupStyled container spacing={4}>
            <Grid item xs={6}>
              <SelectJobs control={control} />
            </Grid>
            <Grid item xs={6}>
              <EditInputValue
                editable
                label="소속"
                name="belong"
                control={control}
              />
            </Grid>
          </GroupStyled>
        </BoxStyled>
      </DialogContent>
      <DialogActions>
        <DoubleButtonWrapper
          leftBtn={<DoubleButton onClick={close}>취소</DoubleButton>}
          rightBtn={<DoubleButton is_right>생성</DoubleButton>}
        />
      </DialogActions>
    </>
  );
};

export default RegisterMember;
