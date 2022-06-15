import React from 'react';
import { Table, TableBody, TableHead, TableRow } from '@mui/material';
import { useSortPage } from 'custom-hook-react';
import { IHead } from '~/src/util/types';
import {
  CustomTablePagination,
  HeadSortLabel,
} from '~/src/component/molecules/table';
import { BodyCell } from '~/src/component/atoms';
import { TableWrapperStyled } from '~/src/globalStyles';

const termsTableHeader: IHead[] = [
  {
    id: 'pk',
    label: '#',
    width: '4%',
  },
  {
    id: 'terms_title',
    label: '약관명',
    width: 'calc(100% - 66%)',
  },
  {
    id: 'terms_type',
    label: '종류',
    width: '7%',
  },
  {
    id: 'terms_date',
    label: '개정일',
    width: '15%',
  },
  {
    id: 'agree',
    label: '동의 여부',
    width: '10%',
  },
  {
    id: 'agree_date',
    label: '동의일',
    width: '15%',
  },
  {
    id: 'end_date',
    label: '철회일',
    width: '15%',
  },
];

const dummy = [
  {
    pk: 12,
    terms_title: 'dkdskdjf skdfjskfjdksk skjdf',
    terms_type: '필수',
    terms_date: '2022-01-20 13:20',
    agree: false,
    agree_date: '2022-10-23 12:33',
    end_date: '2022-12-12 13:44',
  },

  {
    pk: 1,
    terms_title: 'dkdskdjf skdㄴㅇㄹdksk skjdf',
    terms_type: '선택',
    terms_date: '2022-01-20 13:20',
    agree: false,
    agree_date: '2022-10-23 12:33',
    end_date: '2022-12-12 13:44',
  },

  {
    pk: 5,
    terms_title: 'dk아아djf skdfjskfjdksk skjdf',
    terms_type: '필수',
    terms_date: '2022-01-20 13:20',
    agree: true,
    agree_date: '2022-10-23 12:33',
    end_date: '2022-12-12 13:44',
  },
];

const TermsTable = (): JSX.Element => {
  const [
    offset,
    limit,
    handlingPage,
    handlingLimit,
    order,
    orderBy,
    handlingSort,
  ] = useSortPage({ inputOrderBy: 'pk' });

  return (
    <TableWrapperStyled>
      <Table>
        <TableHead>
          <TableRow>
            <HeadSortLabel
              headArr={termsTableHeader}
              sortData={{ asc: order === 'desc', col: orderBy }}
              sortHandler={handlingSort}
            />
          </TableRow>
        </TableHead>
        <TableBody>
          {dummy.map(data => (
            <TableRow key={data.pk}>
              <BodyCell txt={data.pk} />
              <BodyCell txt={data.terms_title} />
              <BodyCell txt={data.terms_type} />
              <BodyCell txt={data.terms_date} />
              <BodyCell txt={data.agree ? '동의' : '미동의'} />
              <BodyCell txt={data.agree_date} />
              <BodyCell txt={data.end_date} />
            </TableRow>
          ))}
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

export default TermsTable;
