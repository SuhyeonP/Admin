import React from 'react';
import { DialogActions, DialogContent } from '@mui/material';
import { useForm } from 'react-hook-form';
import { IRegisterMemberInfo } from '~/src/util/types';
import { DoubleButton } from '~/src/component/atoms';
import { DoubleButtonWrapper } from '~/src/component/molecules/wrapper';
import { globalActions } from '~/src/redux/slice';
import { useAppDispatch } from '~/src/redux/hook';
import { AddMemberForm } from '~/src/component/molecules/form';
import { FormStyled } from '~/src/globalStyles';

const RegisterMember = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const { control, handleSubmit, watch } = useForm<IRegisterMemberInfo>({
    defaultValues: {
      plan: 'community',
      license: 'free',
      job_title: 'Data_Analyst',
    },
  });

  const close = React.useCallback(() => {
    dispatch(globalActions.closeDialog());
  }, []);

  const register = (data: IRegisterMemberInfo) => {
    console.log(data);
  };

  return (
    <>
      <DialogContent>
        <FormStyled onSubmit={handleSubmit(register)}>
          <AddMemberForm control={control} planValue={watch('plan')} />
        </FormStyled>
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

export default RegisterMember;
