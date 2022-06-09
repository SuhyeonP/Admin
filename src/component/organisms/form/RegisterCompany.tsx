import React from 'react';
import { DialogActions, DialogContent, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import { BoxStyled, GroupStyled } from './style';
import { SelectLicense, SelectPlan } from '~/src/component/organisms/select';
import { DoubleButton } from '~/src/component/atoms';
import { DoubleButtonWrapper } from '~/src/component/molecules/wrapper';
import { useAppDispatch } from '~/src/redux/hook';
import { globalActions } from '~/src/redux/slice';
import { IRegisterCompany, IRegisterForm } from '~/src/util/types';
import { EditInputValue } from '~/src/component/molecules/info';

const RegisterCompany = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const { control } = useForm<IRegisterCompany & IRegisterForm>({
    defaultValues: {
      plan: 'enterprise',
      license: 'free',
    },
  });

  const close = React.useCallback(() => {
    dispatch(globalActions.closeDialog());
  }, []);

  return (
    <>
      <DialogContent>
        <BoxStyled>
          <GroupStyled container spacing={4}>
            <Grid item xs={6}>
              <EditInputValue
                editable
                label="기업명"
                name="name"
                control={control}
              />
            </Grid>
            <Grid item xs={6}>
              <EditInputValue
                editable
                label="전화 번호"
                name="phone_number"
                control={control}
              />
            </Grid>
          </GroupStyled>
          <GroupStyled container spacing={4}>
            <Grid item xs={6}>
              <SelectPlan control={control} />
            </Grid>
            <Grid item xs={6}>
              <SelectLicense control={control} />
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

export default RegisterCompany;
