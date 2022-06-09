import React from 'react';
import { Box, Grid } from '@mui/material';
import { css } from '@emotion/react';
import { Title } from '~/src/component/atoms';
import { LinkLogo } from '~/src/asset/icons';

const LoginTitle = (): JSX.Element => {
  return (
    <Box marginBottom="20px">
      <LinkLogo
        css={css`
          width: 100px;
          height: 100px;
        `}
      />
      <Grid container justifyContent="center">
        <Title>Administration</Title>
      </Grid>
    </Box>
  );
};

export default LoginTitle;
