import { Box, Grid, Select, styled } from '@mui/material';
import { defaultBlack } from '~/src/component/style/color';

export const SelectWrapperStyled = styled(Grid)`
  display: flex;
  width: 100%;
  height: 36px;
  border: 1px solid ${defaultBlack};
  border-radius: 4px;

  background-color: white;

  .MuiOutlinedInput-notchedOutline {
    border: 0;
  }

  .inner-button {
    width: 36px;
    min-width: 36px;
    height: 100%;

    padding: 0;
    border-radius: 0;

    background-color: ${defaultBlack};
  }

  .select-search-dropdown {
    & > .MuiSelect-select {
      min-width: 63px;
    }
  }

  .MuiTextField-root {
    flex: 1;
    min-width: 200px;
    height: 36px;

    outline: 0;

    .MuiOutlinedInput-root {
      height: 36px;

      & > .MuiOutlinedInput-input {
        padding-top: 0;
        padding-bottom: 0;
      }
    }
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
  #popover-date-range {
    .MuiPopover-paper {
      width: 800px;
      height: 400px;
    }
  }

  #popover-date {
    .MuiPopover-paper {
      width: 300px;
      height: 300px;
    }
  }
  width: 100%;
`;
