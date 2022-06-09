import React from 'react';
import { Table, TableBody, TableHead, TableRow } from '@mui/material';
import { TableWrapperStyled } from './style';
import { BodyCell, EmptyRows } from '~/src/component/atoms';
import { IHead, ISort } from '~/src/util/types';
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
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(0);

  const [sort, setSort] = React.useState<ISort>({
    col: 'create_date',
    asc: false,
  });

  const emptyRows = React.useMemo(() => {
    return dummy.length === limit ? 0 : limit - dummy.length;
  }, [dummy, limit]);

  const sortHandler = React.useCallback(
    (id: string) => () => {
      const { col, asc } = sort;
      let temp = {} as ISort;

      if (sort.col === id) {
        temp = {
          col,
          asc: !asc,
        };
      } else {
        temp = {
          col: id,
          asc: true,
        };
      }

      setSort(temp);
    },
    [sort],
  );

  const handlingPage = React.useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const handlingLimit = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const limitTemp = parseInt(e.target.value, 10);
      setPage(0);
      // todo check setPage when change limit
      setLimit(limitTemp);
    },
    [],
  );

  return (
    <TableWrapperStyled>
      <Table>
        <TableHead>
          <TableRow>
            <HeadSortLabel
              headArr={companiesTableHeader}
              sortData={sort}
              sortHandler={sortHandler}
            />
          </TableRow>
        </TableHead>
        <TableBody>
          {dummy.map(data => (
            <TableRow key={data.pk}>
              <BodyCell txt={data.pk} />
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
          ))}
          {emptyRows > 0 && <EmptyRows emptyRows={emptyRows} colSpan={6} />}
        </TableBody>
      </Table>
      <CustomTablePagination
        page={page}
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
