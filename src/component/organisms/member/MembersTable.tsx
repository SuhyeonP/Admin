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

const companyMemberHeader: IHead[] = [
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
    width: '20%',
  },
  {
    id: 'full_name',
    label: '성명',
    width: '15%',
  },
  {
    id: 'product_key',
    label: '제품키',
    width: '17%',
  },
  {
    id: 'isAdmin',
    label: '역할',
    width: '10%',
  },
  {
    id: 'last_use_date',
    label: '최근 제품키 사용일',
    width: '18%',
  },
];

const dummy: any[] = [
  {
    id: 1,
    create_date: '2020-09-01 13:00',
    email: 'asdf@dfk.sdf',
    first_name: 'first name',
    last_name: 'last name',
    plan: 'enterprise',
    last_use_date: '2022-06-08',
    last_marketing_agree_date: '2022-06-08',
  },
  {
    id: 22,
    create_date: '2020-09-01 13:00',
    email: 'asdsd.sdffsdf@dfsdfdsk.sdf',
    first_name: 'firstName',
    last_name: 'bebesup',
    plan: 'community',
    last_use_date: '2022-06-08',
    last_marketing_agree_date: '2022-06-08',
  },
];

const dummyCompany = [
  {
    id: 1,
    create_date: '2020-09-01 13:00',
    email: 'asdf@dfk.sdf',
    first_name: 'first name',
    last_name: 'last name',
    product_key: 'sfsfssfsfsddd32df',
    last_use_date: '2022-06-08',
    isAdmin: true,
  },
  {
    id: 22,
    create_date: '2020-09-01 13:00',
    email: 'asdsd.sdffsdf@dfsdfdsk.sdf',
    first_name: 'firstName',
    last_name: 'bebesup',
    product_key: 'comasdfasdfmunity',
    last_use_date: '2022-06-08',
    isAdmin: false,
  },
];

interface IProps {
  isMainList?: boolean;
}

const planType = {
  community: 'Community',
  enterprise: 'Enterprise',
};

const MembersTable = ({ isMainList = false }: IProps): JSX.Element => {
  const [
    offset,
    limit,
    handlingPage,
    handlingLimit,
    order,
    orderBy,
    handlingSort,
  ] = useSortPage({ inputOrderBy: 'create_date' });

  const [arr, setArr] = React.useState<any[]>(
    isMainList ? dummy : dummyCompany,
  );

  React.useEffect(() => {
    setArr(isMainList ? dummy : dummyCompany);
  }, [isMainList]);

  const emptyRows = React.useMemo(() => {
    return dummy.length === limit ? 0 : limit - dummy.length;
  }, [dummy, limit]);

  return (
    <>
      <TableWrapperStyled>
        <Table>
          <TableHead>
            <TableRow>
              <HeadSortLabel
                headArr={isMainList ? membersTableHeader : companyMemberHeader}
                sortData={{ asc: order === 'desc', col: orderBy }}
                sortHandler={handlingSort}
              />
            </TableRow>
          </TableHead>
          <TableBody>
            {arr.length > 0 ? (
              arr.map((data: any, idx: number) => (
                <TableRow key={data.id}>
                  <BodyCell txt={dummy.length - idx} />
                  <BodyCell txt={data.create_date} />
                  <BodyCell txt={data.email} />
                  <BodyCell
                    isUrl
                    url={`member/detail=${data.id}`}
                    txt={`${data.first_name} ${data.last_name}`}
                  />
                  {isMainList ? (
                    <>
                      <BodyCell txt={planType[data.plan]} />
                      <BodyCell txt={data.last_use_date} />
                      <BodyCell txt={data.last_marketing_agree_date} />
                    </>
                  ) : (
                    <>
                      <BodyCell txt={data.product_key} />
                      <BodyCell txt={data.isAdmin ? 'Admin' : 'Member'} />
                      <BodyCell txt={data.last_use_date} />
                    </>
                  )}
                </TableRow>
              ))
            ) : (
              <EmptyTableBody />
            )}
            {isMainList && emptyRows > 0 && arr.length > 0 && (
              <EmptyRows emptyRows={emptyRows} />
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
    </>
  );
};

export default MembersTable;
