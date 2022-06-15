import React from 'react';
import { FormControlLabel, Radio } from '@mui/material';
import { IRadio } from '~/src/util/types';

const RadioBtn = ({ label, value }: IRadio): JSX.Element => {
  return <FormControlLabel control={<Radio />} label={label} value={value} />;
};

export default RadioBtn;
