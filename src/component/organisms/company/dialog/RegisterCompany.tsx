import React from 'react';
import { DialogActions, DialogContent, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import { BoxStyled, GroupStyled, FormStyled } from '~/src/globalStyles';
import { SelectLicense, SelectPlan } from '~/src/component/molecules/select';
import { DoubleButton } from '~/src/component/atoms';
import { DoubleButtonWrapper } from '~/src/component/molecules/wrapper';
import { useAppDispatch } from '~/src/redux/hook';
import { globalActions } from '~/src/redux/slice';
import { IRegisterCompany, IRegisterForm } from '~/src/util/types';
import { EditInputValue } from '~/src/component/molecules/info';

const RegisterCompany = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const { control, handleSubmit } = useForm<IRegisterCompany & IRegisterForm>({
    defaultValues: {
      plan: 'enterprise',
      license: 'free',
    },
  });

  const close = React.useCallback(() => {
    dispatch(globalActions.closeDialog());
  }, []);

  const register = (data: IRegisterCompany & IRegisterForm) => {
    console.log(data);
    // todo saga 에서 성공후 그 회사로 이동해야함
  };

  return (
    <>
      <DialogContent>
        <BoxStyled>
          <FormStyled onSubmit={handleSubmit(register)}>
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
                <SelectPlan control={control} isRegister isCompany />
              </Grid>
              <Grid item xs={6}>
                <SelectLicense control={control} />
              </Grid>
            </GroupStyled>
          </FormStyled>
        </BoxStyled>
      </DialogContent>
      <DialogActions>
        <DoubleButtonWrapper
          leftBtn={<DoubleButton onClick={close}>취소</DoubleButton>}
          rightBtn={
            <DoubleButton is_right onClick={handleSubmit(register)}>
              생성
            </DoubleButton>
          }
        />
      </DialogActions>
    </>
  );
};

export default RegisterCompany;
