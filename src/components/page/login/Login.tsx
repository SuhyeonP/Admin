import React from 'react';
import { Helmet } from 'react-helmet-async';
import { LoginTemplate } from '~/components/template/login';

const Login = (): JSX.Element => {
  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <LoginTemplate />
    </>
  );
};

export default Login;
