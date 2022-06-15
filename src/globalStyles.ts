import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Box, Grid, styled as muiStyled, TableContainer } from '@mui/material';
import { defaultWhite } from '~/src/component/style/color';

export const globalStyles = css`
  // put global styles here
  body {
    width: 100vw;
    height: 100vh;
  }

  * {
    margin: 0;
    padding: 0;
  }

  #root {
    width: 100%;
    height: 100%;
  }
`;

export const FormStyled = styled.form`
  width: 100%;
`;

export const CommonBoxStyled = muiStyled(Box)`
  width: 100%;
`;

export const BoxStyled = muiStyled(Box)`
  min-width: 800px;
`;

export const GroupStyled = muiStyled(Grid)`
  margin-bottom: 20px;
`;

export const TableWrapperStyled = muiStyled(TableContainer)`
  width: 100%;
  margin: 16px 0 32px;

  background-color: ${defaultWhite};

  td,
  th {
    padding: 16px;
    border: 0;
  }

  .MuiCheckbox-root {
    padding: 0;
  }
`;
