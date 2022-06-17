import React from 'react';
import { Box, Button, FormControl } from '@mui/material';
import { useInput } from 'custom-hook-react';
import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { ControlRuleInput } from '~/components/common/controlRuleInput';
import { AuthContext } from '~/model';
import { IResponseData } from '~/api/customAPI';
import { IAuth, ILoginInput, userStore } from '~/model/store';
import { checkErr } from '~/api/checkErr';
import { emailRegExp } from '~/util/regExp';
import { IFormInputError } from '~/model/common';

const initError: Record<keyof ILoginInput, IFormInputError> = {
  email: {
    isError: false,
    msg: '잘못된 이메일 입니다.',
  },
  password: {
    isError: false,
    msg: '필수 입력입니다.',
  },
};

const LoginForm = (): JSX.Element => {
  const [email, onChangeEmail, setEmail] = useInput<string>('');
  const [password, onChangePassword, setPassword] = useInput<string>('');

  const [error, setError] = React.useState(initError);

  const { settingAuth } = React.useContext(AuthContext);

  const mutation = useMutation<IResponseData<IAuth>, AxiosError, any>(
    userStore.login,
    {
      onSuccess: res => {
        if (res.ok) {
          settingAuth(res.result.bearer_token);
        } else {
          // todo check scenario
          console.log(res.err.code === 'InvalidEmailOrPassword');
        }
      },
      onError: err => {
        const checkError = checkErr(err as AxiosError);
        // todo check scenario
      },
    },
  );

  const submitLogin = React.useCallback(
    (e: React.FormEvent | unknown) => {
      const sss = !emailRegExp.test(email);
      const temp = [sss, password === ''];
      setError(prev => {
        return {
          email: {
            isError: temp[0],
            msg: prev.email.msg,
          },
          password: {
            isError: temp[1],
            msg: prev.password.msg,
          },
        };
      });

      if (temp.every(item => !item)) {
        mutation.mutate({ email, password });
      } else {
        return;
      }
    },
    [email, password],
  );

  const enterLogin = React.useCallback(
    e => {
      if (e.key === 'Enter') {
        submitLogin(e);
      }
    },
    [email, password],
  );

  return (
    <>
      <FormControl onSubmit={submitLogin} onKeyPress={enterLogin} fullWidth>
        <Box mb={3}>
          <ControlRuleInput
            error={error['email']}
            value={email}
            onChange={onChangeEmail}
          />
        </Box>
        <Box>
          <ControlRuleInput
            type="password"
            error={error['password']}
            value={password}
            onChange={onChangePassword}
          />
        </Box>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={submitLogin}
        >
          Sign In
        </Button>
      </FormControl>
    </>
  );
};

export default LoginForm;
