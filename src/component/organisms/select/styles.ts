import { Box, Grid, Select, styled } from '@mui/material';
import { defaultBlack } from '~/src/component/style/color';

export const SelectWrapperStyled = styled(Grid)`
  display: flex;
  border: 1px solid ${defaultBlack};
  border-radius: 4px;
  height: 36px;
  background-color: white;
  width: 100%;

  .MuiOutlinedInput-notchedOutline {
    border: 0;
  }

  .inner-button {
    background-color: ${defaultBlack};
    border-radius: 0;

    width: 36px;
    min-width: 36px;

    padding: 0;
  }
`;

export const SelectDropStyled = styled(Select)`
  height: 36px;
  background-color: white;

  & > .MuiOutlinedInput-notchedOutline {
    border-color: ${defaultBlack};
  }
`;

export const SelectBoxStyled = styled(Box)`
  width: 100%;
`;
