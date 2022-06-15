import React from 'react';
import { Button, Grid, styled, TablePagination } from '@mui/material';
import { TableLabel } from '~/src/component/atoms';
import { defaultBlack } from '~/src/component/style/color';

interface IProps {
  page: number;
  limitOptions: number[];
  limit: number;
  total: number;
  handlingLimit: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlingPage: (event: unknown, newPage: number) => void;
}

const PaginationStyled = styled(Grid)`
  padding: 8px 0;
  .origin-pagination {
    flex: 1;

    color: ${defaultBlack};

    & > .MuiTablePagination-root {
      border: 0;
    }

    .MuiTablePagination-toolbar {
      display: grid;
      grid-template-columns: auto auto auto;
      padding-left: 24px;

      & > .MuiTablePagination-displayedRows {
        order: 0;
      }

      & > .MuiTablePagination-selectLabel {
        order: 1;
        padding-left: 24px;
      }

      & > .MuiInputBase-root {
        order: 2;
      }

      & > .MuiTablePagination-actions,
      & > .MuiTablePagination-spacer {
        display: none;
      }
    }
  }
  .sub-pagination {
    display: flex;
    align-items: center;
  }
`;

const CustomTablePagination = ({
  page,
  limit,
  limitOptions,
  handlingPage,
  handlingLimit,
  total,
}: IProps): JSX.Element => {
  return (
    <PaginationStyled container>
      <Grid item className="origin-pagination">
        <TablePagination
          page={page}
          rowsPerPage={limit}
          count={total}
          onPageChange={handlingPage}
          onRowsPerPageChange={handlingLimit}
          rowsPerPageOptions={limitOptions}
        />
      </Grid>
      <Grid item className="sub-pagination">
        <Button type="button">{'<'}</Button>
        <TableLabel>
          {page + 1} / {limit}
        </TableLabel>
        <Button type="button">{'>'}</Button>
      </Grid>
    </PaginationStyled>
  );
};

export default React.memo(CustomTablePagination);
