import React from 'react';
import { Box } from '@mui/material';
import { LoginTitle } from '~/src/component/molecules/logoWithTitle';
import { LoginForm } from '~/src/component/organisms/login';

const Login = (): JSX.Element => {
  return (
    <Box display="table" width="100%" height="100vh">
      <Box
        display="table-cell"
        textAlign="center"
        sx={{ verticalAlign: 'middle' }}
      >
        <Box display="block" margin="0 auto" textAlign="center">
          <Box width="30vw" display="inline-block">
            <LoginTitle />
            <LoginForm />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
