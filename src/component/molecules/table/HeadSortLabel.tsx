import React from 'react';
import { styled, TableCell, TableSortLabel } from '@mui/material';
import { SortHidden, TableLabel } from '~/src/component/atoms';
import { IHead, ISort } from '~/src/util/types';

interface IProps {
  headArr: IHead[];
  sortData: ISort;
  sortHandler: (id: string) => () => void;
}

const TableSortLabelStyled = styled(TableSortLabel)`
  display: flex;

  & > .MuiSvgIcon-root {
    height: 14px;
  }
`;

const HeadSortLabel = ({
  headArr,
  sortData,
  sortHandler,
}: IProps): JSX.Element => {
  const checkSelectOrderBy = React.useCallback(
    (id: string) => {
      return sortData.col === id;
    },
    [sortData],
  );

  return (
    <>
      {headArr.map(head => {
        const id = head.id;
        const same = sortHandler(id);

        return (
          <TableCell key={id} sx={{ width: head.width }}>
            <TableSortLabelStyled
              active={checkSelectOrderBy(id)}
              onClick={same}
              direction={same ? (sortData.asc ? 'asc' : 'desc') : 'asc'}
            >
              <>
                <TableLabel>{head.label}</TableLabel>
                {same ? <SortHidden isAsc={sortData.asc} /> : null}
              </>
            </TableSortLabelStyled>
          </TableCell>
        );
      })}
    </>
  );
};

function checkEqual(prev, next) {
  return JSON.stringify(prev.sortData) === JSON.stringify(next.sortData);
}

export default React.memo(HeadSortLabel, checkEqual);
