import React from 'react';
import { TableCell, TableRow } from '@mui/material';
import { EmptyRows } from '~/src/component/atoms';

interface IProps {
  label?: string;
  emptyRow?: number;
  emptyCol?: number;
}

const EmptyTableBody = ({
  label,
  emptyRow = 1,
  emptyCol = 7,
}: IProps): JSX.Element => {
  return (
    <>
      <EmptyRows emptyRows={emptyRow} />
      <TableRow>
        <TableCell colSpan={emptyCol} sx={{ textAlign: 'center' }}>
          {label || '등록된 정보가 없습니다.'}
        </TableCell>
      </TableRow>
      <EmptyRows emptyRows={emptyRow} />
    </>
  );
};

export default EmptyTableBody;
