import React from 'react';
import { Box } from '@mui/material';
import { visuallyHidden } from '@mui/utils';

interface IProps {
  isAsc: boolean;
}

const SortHidden = ({ isAsc }: IProps): JSX.Element => {
  return (
    <Box component="span" sx={visuallyHidden}>
      {isAsc ? 'sorted ascending' : 'sorted descending'}
    </Box>
  );
};

export default SortHidden;
