import React from 'react';
import { TextFieldProps, TextField, styled } from '@mui/material';
import { ExtendOmit } from '~/src/util/types';
import { defaultBlack } from '~/src/component/style/color';

type IProps = ExtendOmit<TextFieldProps>;

const InputStyled = styled(TextField)`
  & > .MuiInputBase-root {
    height: 36px;
    padding: 0;
  }
  .MuiOutlinedInput-notchedOutline {
    border-color: ${defaultBlack};
  }
`;

const InputContent = ({ ...props }: IProps): JSX.Element => {
  return <InputStyled variant="outlined" {...props} />;
};

export default InputContent;
