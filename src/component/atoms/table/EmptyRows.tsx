import React from 'react';
import { TableCell, TableRow } from '@mui/material';

interface IProps {
  height?: number;
  colSpan?: number;
  emptyRows: number;
}

const EmptyRows = ({
  height = 48,
  colSpan = 7,
  emptyRows,
}: IProps): JSX.Element => {
  return (
    <TableRow style={{ height: height * emptyRows }}>
      <TableCell colSpan={colSpan} />
    </TableRow>
  );
};

export default EmptyRows;
