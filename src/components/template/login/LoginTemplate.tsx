import React from 'react';
import { Container, Typography } from '@mui/material';
import styled from '@emotion/styled';
import { LoginForm } from '~/components/organism/login';

const AdminLoginWrapper = styled.div`
  margin: 30vh 0;
`;
const LoginTemplate = (): JSX.Element => {
  return (
    <AdminLoginWrapper>
      <Container component="main" maxWidth="xs">
        <Typography component="h1" variant="h5" align="center" mb="35px">
          Link Admin
        </Typography>
        <LoginForm />
      </Container>
    </AdminLoginWrapper>
  );
};

export default LoginTemplate;
