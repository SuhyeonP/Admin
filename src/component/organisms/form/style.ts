import { Box, Grid, styled as muiStyled } from '@mui/material';
import styled from '@emotion/styled';

export const BoxStyled = muiStyled(Box)`
  min-width: 800px;
`;

export const GroupStyled = muiStyled(Grid)`
  margin-bottom: 20px;
`;

export const RegisterFormStyled = styled.form`
  width: 100%;
`;
