import React from 'react';
import { Table, TableBody, TableHead, TableRow } from '@mui/material';
import { useSortPage } from 'custom-hook-react';
import { TableWrapperStyled } from '~/src/globalStyles';
import {
  CustomTablePagination,
  HeadSortLabel,
} from '~/src/component/molecules/table';
import { IHead } from '~/src/util/types';
import { BodyCell } from '~/src/component/atoms';
import { versionStatus } from '~/src/util/initalValue';

const tableHeader: IHead[] = [
  {
    id: 'pk',
    label: '#',
    width: '4%',
  },
  {
    id: 'create_date',
    label: '등록일',
    width: '32%',
  },
  {
    id: 'version',
    label: '버전',
    width: '10%',
  },
  {
    id: 'status',
    label: '운영 상태',
    width: '14%',
  },
  {
    id: 'last_update_date',
    label: '최근 배포일',
    width: '20%',
  },
  {
    id: 'last_write_date',
    label: '최근 노트 작성일',
    width: '20%',
  },
];

const dummy = [
  {
    id: 1,
    create_date: '2022-10-20 13:44',
    version: '0.2.3',
    status: 'ready',
    last_update_date: '2022-09-19 13:33',
    last_write_date: '2022-09-19 13:33',
  },
  {
    id: 3,
    create_date: '2022-09-20 13:44',
    version: '0.2.7',
    status: 'ongoing',
    last_update_date: '2022-09-19 13:33',
    last_write_date: '2022-09-19 13:33',
  },
];

const VersionTable = (): JSX.Element => {
  const [
    offset,
    limit,
    handlingPage,
    handlingLimit,
    order,
    orderBy,
    handlingSort,
  ] = useSortPage({ inputOrderBy: 'create_date' });

  return (
    <TableWrapperStyled>
      <Table>
        <TableHead>
          <TableRow>
            <HeadSortLabel
              headArr={tableHeader}
              sortData={{ asc: order === 'desc', col: orderBy }}
              sortHandler={handlingSort}
            />
          </TableRow>
        </TableHead>
        <TableBody>
          {dummy.map((ele, idx) => (
            <TableRow key={ele.id}>
              <BodyCell txt={order === 'asc' ? dummy.length - idx : idx + 1} />
              <BodyCell txt={ele.create_date} />
              <BodyCell
                isUrl
                url={`operation/deployment/detail=${ele.id}`}
                txt={ele.version}
              />
              <BodyCell txt={versionStatus[ele.status]} />
              <BodyCell txt={ele.last_update_date} />
              <BodyCell txt={ele.last_write_date} />
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <CustomTablePagination
        page={offset}
        limitOptions={[10, 20, 30]}
        limit={limit}
        total={3}
        handlingLimit={handlingLimit}
        handlingPage={handlingPage}
      />
    </TableWrapperStyled>
  );
};

export default VersionTable;
