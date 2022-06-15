import React from 'react';
import { Table, TableBody, TableHead, TableRow } from '@mui/material';
import { useSortPage } from 'custom-hook-react';
import { TableWrapperStyled } from '~/src/globalStyles';
import { BodyCell, EmptyRows, EmptyTableBody } from '~/src/component/atoms';
import { IHead } from '~/src/util/types';
import {
  CustomTablePagination,
  HeadSortLabel,
} from '~/src/component/molecules/table';

const companiesTableHeader: IHead[] = [
  {
    id: 'pk',
    label: '#',
    width: '4%',
  },
  {
    id: 'create_date',
    label: '기업 생성일',
    width: '15%',
  },
  {
    id: 'name',
    label: '기업명',
    width: 'calc(100% - 65%)',
  },
  {
    id: 'member_count',
    label: '구성원수',
    width: '10%',
  },
  {
    id: 'license_start_date',
    label: '라이선스 시작일',
    width: '18%',
  },
  {
    id: 'license_end_date',
    label: '라이선스 종료일',
    width: '18%',
  },
];

const dummy = [
  {
    pk: 1,
    create_date: '2020-09-01 13:00',
    name: 'company1',
    member_count: 12,
    license_start_date: '2020-09-01 13:00',
    license_end_date: '2020-09-01 13:00',
  },
  {
    pk: 21,
    create_date: '2020-09-01 13:00',
    name: '쥰지 쥰지 쥰지',
    member_count: 192,
    license_start_date: '2020-09-01 13:00',
    license_end_date: '2020-09-01 13:00',
  },
];

const CompaniesTable = (): JSX.Element => {
  const [
    offset,
    limit,
    handlingPage,
    handlingLimit,
    order,
    orderBy,
    handlingSort,
  ] = useSortPage({ inputOrderBy: 'create_date' });

  const emptyRows = React.useMemo(() => {
    return dummy.length === limit ? 0 : limit - dummy.length;
  }, [dummy, limit]);

  return (
    <TableWrapperStyled>
      <Table>
        <TableHead>
          <TableRow>
            <HeadSortLabel
              headArr={companiesTableHeader}
              sortData={{ asc: order === 'desc', col: orderBy }}
              sortHandler={handlingSort}
            />
          </TableRow>
        </TableHead>
        <TableBody>
          {dummy.length > 0 ? (
            dummy.map((data, idx) => (
              <TableRow key={data.pk}>
                <BodyCell
                  txt={order === 'asc' ? dummy.length - idx : idx + 1}
                />
                <BodyCell txt={data.create_date} />
                <BodyCell
                  isUrl
                  url={`company/detail=${data.pk}`}
                  txt={data.name}
                />
                <BodyCell txt={data.member_count} />
                <BodyCell txt={data.license_start_date} />
                <BodyCell txt={data.license_end_date} />
              </TableRow>
            ))
          ) : (
            <EmptyTableBody />
          )}
          {dummy.length > 0 && emptyRows > 0 && (
            <EmptyRows emptyRows={emptyRows} colSpan={6} />
          )}
        </TableBody>
      </Table>
      <CustomTablePagination
        page={offset}
        limitOptions={[10, 20, 30]}
        limit={limit}
        total={dummy.length}
        handlingLimit={handlingLimit}
        handlingPage={handlingPage}
      />
    </TableWrapperStyled>
  );
};

export default CompaniesTable;
