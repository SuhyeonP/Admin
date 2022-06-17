import React from 'react';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import { AuthContext, MemberContext } from '~/model';
import { IResponseMember, memberStore, userStore } from '~/model/store';
import { IListDataResponse, ISortInfo, memberRow } from '~/model/common';
import { checkErr } from '~/api/checkErr';
import { IResponseData } from '~/api/customAPI';
import { MemberSelectedContext } from '~/model/memberModel';

const MemberTable = (): JSX.Element => {
  const { state: selected, setState: setSelected } = React.useContext(
    MemberSelectedContext,
  );
  const { logout } = React.useContext(AuthContext);
  const { customer_id, refetch, setRefetch } = React.useContext(MemberContext);

  const [members, setMembers] = React.useState<IResponseMember[]>([]);
  const [count, setCount] = React.useState(0);
  const [offset, setOffset] = React.useState(0);
  const [limit, setLimit] = React.useState(10);

  const [sort] = React.useState<ISortInfo[]>([
    {
      col: 'member_id',
      asc: true,
    },
  ]);

  const {
    isLoading,
    data,
    error,
    refetch: listRefetch,
  } = useQuery<
    any,
    AxiosError,
    IResponseData<IListDataResponse<IResponseMember>>
  >(
    ['members', customer_id, offset, limit, sort],
    async () =>
      await memberStore.getMembers({
        customer_id,
        offset,
        limit,
        sort,
      }),
    {
      retry: false,
      enabled: userStore.isAuthorized,
      staleTime: 5000,
      keepPreviousData: true,
    },
  );

  React.useEffect(() => {
    if (refetch) {
      listRefetch();
      setRefetch(false);
    }
  }, [refetch]);

  React.useEffect(() => {
    if (error) {
      const checkError = checkErr(error);
      if (checkError.tokenInValid) {
        logout();
      }
    } else if (data) {
      if (data.ok) {
        setMembers(data.result.items);
        setCount(data.result.total_count);
      }
    }
  }, [error, data]);

  const emptyRows = React.useMemo(() => {
    if (members.length) {
      return count === limit ? 0 : limit - members.length;
    } else {
      return limit;
    }
  }, [members, limit]);

  const handleOffset = React.useCallback((event: unknown, newPage: number) => {
    setOffset(newPage);
  }, []);

  const checkIndex = React.useCallback(
    (id: number) => {
      return selected.findIndex(item => item.member_id === id);
    },
    [selected],
  );

  const handleLimit = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setOffset(0);
      setLimit(parseInt(e.target.value, 10));
    },
    [],
  );

  const clickCell = React.useCallback(
    (e: React.MouseEvent<unknown>, member: IResponseMember) => {
      setSelected(prev => {
        const idx = checkIndex(member.member_id);
        if (idx === -1) {
          prev.push(member);
        } else {
          prev.splice(idx, 1);
        }
        return prev.map(ele => ele);
      });
    },
    [selected],
  );

  const clickAllCell = React.useCallback(
    e => {
      if (e.target.checked) {
        setSelected(members.slice());
      } else {
        setSelected([]);
      }
    },
    [members],
  );

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              onClick={clickAllCell}
              checked={members.length > 0 && selected.length === members.length}
              indeterminate={
                selected.length > 0 && selected.length < members.length
              }
            />
          </TableCell>
          {memberRow.map(headRow => (
            <TableCell key={headRow.id}>{headRow.label}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {!isLoading &&
          data?.ok &&
          members.map((row: IResponseMember) => {
            const isSelected = checkIndex(row.member_id) !== -1;
            return (
              <TableRow key={row.email}>
                <TableCell padding="checkbox">
                  <Checkbox
                    onClick={e => clickCell(e, row)}
                    checked={isSelected}
                  />
                </TableCell>
                <TableCell>{row.workspace}</TableCell>
                <TableCell>{row.last_name + ' ' + row.first_name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.phone_number || ''}</TableCell>
                <TableCell>{row.job_title}</TableCell>
                <TableCell>{row.member_license_key}</TableCell>
              </TableRow>
            );
          })}
        {emptyRows > 0 && (
          <TableRow sx={{ height: 53 * emptyRows }}>
            <TableCell colSpan={6} />
          </TableRow>
        )}
      </TableBody>
      <TablePagination
        count={count}
        page={offset}
        onPageChange={handleOffset}
        onRowsPerPageChange={handleLimit}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 20]}
      />
    </Table>
  );
};

export default MemberTable;
