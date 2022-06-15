import React from 'react';
import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { useSortPage } from 'custom-hook-react';
import { TableWrapperStyled } from '~/src/globalStyles';
import {
  CustomTablePagination,
  HeadSortLabel,
} from '~/src/component/molecules/table';
import { ISimpleMember } from '~/src/util/types';
import { BodyCell } from '~/src/component/atoms';

const simpleHead = [
  {
    id: 'pk',
    label: '#',
    width: '4%',
  },
  {
    id: 'email',
    label: '이메일',
    width: '45%',
  },
  {
    id: 'name',
    label: '성명',
    width: '45%',
  },
];

interface IProps {
  total: number;
  members: ISimpleMember[];
  selected: number[];
  selectAll: (e: any) => void;
  selectMember: (data: number) => () => void;
  checkContain: (id: number) => boolean;
  checkChecked: number;
}

const SimpleMembersTable = ({
  total,
  members,
  selectAll,
  selectMember,
  checkContain,
  selected,
  checkChecked,
}: IProps): JSX.Element => {
  const [
    offset,
    limit,
    handlingPage,
    handlingLimit,
    order,
    orderBy,
    handlingSort,
  ] = useSortPage({ inputOrderBy: 'email' });

  return (
    <TableWrapperStyled>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: '6%' }}>
              <Checkbox
                onClick={selectAll}
                checked={checkChecked === members.length}
              />
            </TableCell>
            <HeadSortLabel
              sortHandler={handlingSort}
              sortData={{ asc: order === 'desc', col: orderBy }}
              headArr={simpleHead}
            />
          </TableRow>
        </TableHead>
        <TableBody>
          {members.map((data, idx) => {
            const id = data.id;
            const isSelected = checkContain(id);

            return (
              <TableRow key={id}>
                <TableCell>
                  <Checkbox checked={isSelected} onClick={selectMember(id)} />
                </TableCell>
                <BodyCell
                  txt={order === 'asc' ? members.length - idx : idx + 1}
                />
                <BodyCell txt={data.email} />
                <BodyCell txt={`${data.first_name} ${data.last_name}`} />
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <CustomTablePagination
        page={offset}
        handlingLimit={handlingLimit}
        handlingPage={handlingPage}
        limit={limit}
        limitOptions={[5, 10]}
        total={total}
      />
    </TableWrapperStyled>
  );
};

function checkReRender(prev: IProps, now: IProps) {
  if (
    prev.selected !== now.selected ||
    prev.members !== prev.members ||
    prev.total !== prev.total
  ) {
    return false;
  }

  return true;
}

export default React.memo(SimpleMembersTable, checkReRender);
