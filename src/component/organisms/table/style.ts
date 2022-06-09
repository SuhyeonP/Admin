import { styled, TableContainer } from '@mui/material';
import { defaultWhite } from '~/src/component/style/color';

export const TableWrapperStyled = styled(TableContainer)`
  width: 100%;
  margin: 16px 0 32px;

  background-color: ${defaultWhite};

  td,
  th {
    border: 0;
    padding: 16px;
  }
`;
