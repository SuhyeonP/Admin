import React from 'react';
import { Table, TableBody, TableHead, TableRow } from '@mui/material';
import { TableWrapperStyled } from './style';
import { BodyCell, EmptyRows } from '~/src/component/atoms';
import { IHead, ISort } from '~/src/util/types';
import {
  CustomTablePagination,
  HeadSortLabel,
} from '~/src/component/molecules/table';

const membersTableHeader: IHead[] = [
  {
    id: 'pk',
    label: '#',
    width: '4%',
  },
  {
    id: 'create_date',
    label: '회원 생성일',
    width: '16%',
  },
  {
    id: 'email',
    label: '이메일',
    width: '25%',
  },
  {
    id: 'full_name',
    label: '성명',
    width: '20%',
  },
  {
    id: 'plan',
    label: '플랜',
    width: '7%',
  },
  {
    id: 'last_use_date',
    label: '최근 사용일',
    width: '13%',
  },
  {
    id: 'last_marketing_agree_date',
    label: '최근 마케팅 동의일',
    width: '15%',
  },
];

const dummy = [
  {
    pk: 1,
    create_date: '2020-09-01 13:00',
    email: 'asdf@dfk.sdf',
    first_name: 'first name',
    last_name: 'last name',
    plan: 'community',
    last_use_date: '2022-06-08',
    last_marketing_agree_date: '2022-06-08',
  },
  {
    pk: 22,
    create_date: '2020-09-01 13:00',
    email: 'asdsd.sdffsdf@dfsdfdsk.sdf',
    first_name: 'firstName',
    last_name: 'bebesup',
    plan: 'community',
    last_use_date: '2022-06-08',
    last_marketing_agree_date: '2022-06-08',
  },
];

interface IProps {
  isMainList?: boolean;
}

const MembersTable = ({ isMainList = false }: IProps): JSX.Element => {
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
              headArr={membersTableHeader}
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
              <BodyCell txt={data.email} />
              <BodyCell
                isUrl
                url={`member/detail=${data.pk}`}
                txt={`${data.first_name} ${data.last_name}`}
              />
              <BodyCell txt={data.plan} />
              <BodyCell txt={data.last_use_date} />
              <BodyCell txt={data.last_marketing_agree_date} />
            </TableRow>
          ))}
          {isMainList && emptyRows > 0 && <EmptyRows emptyRows={emptyRows} />}
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

export default MembersTable;
