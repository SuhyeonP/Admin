import React from 'react';
import {
  Box,
  Typography,
  styled as muiStyled,
  TextField,
  FormControl,
  BoxProps,
  FormLabel,
} from '@mui/material';
import { ExtendOmit, ReactOnChange } from '~/model/common';
import { IFormInputError } from '~/model/common/dataType';

interface IProps extends ExtendOmit<BoxProps> {
  value: string | number;
  onChange: ReactOnChange;
  type?: string;
  title?: string;
  error?: IFormInputError;
  disable?: boolean;
}
const TitleStyled = muiStyled(Typography)({
  '&.MuiTypography-root': {
    marginBottom: '10px',
  },
});

const ControlRuleInput = ({
  title,
  value,
  onChange,
  error,
  type = 'text',
  disable,
  ...props
}: IProps): JSX.Element => {
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      }}
      {...props}
    >
      {title && <TitleStyled>{title}</TitleStyled>}
      <TextField
        type={type}
        value={value}
        onChange={onChange}
        disabled={disable}
        sx={{ mb: '20px' }}
      />
      {error && error.isError && (
        <FormControl
          required
          error={error.isError}
          sx={{
            position: 'absolute',
            display: 'block',
            bottom: '-10px',
            width: '100%',
          }}
        >
          <FormLabel>{error.msg}</FormLabel>
        </FormControl>
      )}
    </Box>
  );
};

export default ControlRuleInput;
