import React from 'react';
import { useForm } from 'react-hook-form';
import { FieldErrors } from 'react-hook-form/dist/types/errors';
import { FormGroup, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { errorMsg } from '~/src/util/errorMsg';
import { ErrorMsgType } from '~/src/util/types';
import { TitleWith } from '~/src/component/molecules/textWithInput';
import { ErrorLabel, SubmitBtn } from '~/src/component/atoms';
import { regEmail, regPw } from '~/src/util/regExp';
import { defaultBlack } from '~/src/component/style/color';

interface ILoginValue {
  email: string;
  password: string;
}

const LoginForm = (): JSX.Element => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<ILoginValue>();
  const [error, setError] = React.useState(errorMsg);

  const submit = (data: ILoginValue): void => {
    setError(errorMsg);
    const { email, password } = data;
    console.log(email, password);
    navigate('/member/list');
  };

  const failedSubmit = (data: FieldErrors<ILoginValue>): void => {
    const temp: ErrorMsgType = {} as ErrorMsgType;

    if (data.email && data.email.type) {
      const { type } = data.email;

      temp['email'] =
        type === 'required' ? '필수입력입니다.' : '잘못된 형식입니다.';
    }

    if (data.password && data.password.type) {
      const { type } = data.password;

      temp['password'] =
        type === 'required' ? '필수입력입니다.' : '잘못된 형식입니다.';
    }

    setError(temp);
  };

  return (
    <>
      <form onSubmit={handleSubmit(submit, failedSubmit)}>
        <FormGroup>
          <TitleWith titleValue="Email">
            <TextField
              fullWidth
              {...register('email', { required: true, pattern: regEmail })}
            />
            <ErrorLabel>{error.email}</ErrorLabel>
          </TitleWith>
          <TitleWith titleValue="Password">
            <TextField
              fullWidth
              type="password"
              {...register('password', { required: true, pattern: regPw })}
            />
            <ErrorLabel>{error.password}</ErrorLabel>
          </TitleWith>
          <SubmitBtn
            label="로그인"
            isAble
            fontColor="#fff"
            backgroundColor={defaultBlack}
          />
        </FormGroup>
      </form>
    </>
  );
};

export default LoginForm;
