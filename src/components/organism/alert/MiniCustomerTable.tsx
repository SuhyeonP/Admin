import React from 'react';
import {
  Checkbox,
  Grid,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import {
  customerStore,
  IResponseCustomer,
  ISelectedCustomer,
  IUserActionListRequest,
  userStore,
} from '~/model/store';
import { IListDataResponse, ReactSetState } from '~/model/common';
import { checkErr } from '~/api/checkErr';
import { AuthContext } from '~/model';
import { IResponseData } from '~/api/customAPI';
import SortingCustomerTable from '~/components/common/sortingData/SortingCustomerTable';
import { SearchForm } from '~/components/organism/customer';
import { Block } from '~/components/common/styleMui';

interface IProps {
  tempSelected: ISelectedCustomer[];
  setTS: ReactSetState<ISelectedCustomer[]>;
}

const MiniCustomerTable = ({ tempSelected, setTS }: IProps): JSX.Element => {
  const { logout } = React.useContext(AuthContext);

  const [count, setCount] = React.useState(0);
  const [customers, setCustomers] = React.useState<IResponseCustomer[]>([]);
  const [limit] = React.useState(6);

  const [sorting, setSorting] = React.useState<IUserActionListRequest>({
    total: true,
    offset: 0,
    limit,
    sort: [
      {
        col: 'customer_id',
        asc: true,
      },
    ],
  });

  const { isLoading, data, error } = useQuery<
    IResponseData<IListDataResponse<IResponseCustomer>>,
    AxiosError
  >(
    ['simple-customers', sorting],
    async () => await customerStore.getCustomerList(sorting),
    {
      retry: false,
      enabled: userStore.isAuthorized,
      staleTime: 5000,
      keepPreviousData: true,
    },
  );

  const emptyRows = React.useMemo(() => {
    if (isLoading) {
      return 6;
    } else if (data && data.ok) {
      return count === limit ? 0 : limit - customers.length;
    } else {
      return limit;
    }
  }, [isLoading, customers, count, limit, data]);

  React.useEffect(() => {
    if (error) {
      const checkError = checkErr(error);
      if (checkError.tokenInValid) {
        logout();
      }
    } else if (data) {
      const { ok, err, result } = data;

      if (ok) {
        setCustomers(result.items);
        setCount(result.total_count);
      }
    }
  }, [error, data]);

  const checkIdx = React.useCallback(
    (id: number) => {
      return tempSelected.findIndex(item => item.customer_id === id);
    },
    [tempSelected],
  );

  const clickCell = React.useCallback(
    (
      e: React.MouseEvent<unknown>,
      member_count: number,
      customer_id: number,
    ) => {
      setTS(prev => {
        const idx = checkIdx(customer_id);

        if (idx === -1) {
          prev.push({ member_count, customer_id });
        } else {
          prev.splice(idx, 1);
        }

        return prev.map(ele => ele);
      });
    },
    [tempSelected],
  );

  const clickAllCell = React.useCallback(
    e => {
      if (e.target.checked) {
        setTS(customers.slice());
      } else {
        setTS([]);
      }
    },
    [customers],
  );

  const changePage = React.useCallback((event: unknown, newPage: number) => {
    setSorting(prev => {
      return {
        ...prev,
        offset: newPage - 1,
      };
    });
  }, []);

  const settingCustomersDetail = React.useCallback(
    (data: IUserActionListRequest) => {
      setSorting(data);
    },
    [],
  );

  return (
    <Grid container>
      <Block container>
        <SearchForm
          settingCustomersDetail={settingCustomersDetail}
          sorting={sorting}
        />
      </Block>
      <Block container>
        <SortingCustomerTable
          settingCustomersDetail={settingCustomersDetail}
          sorting={sorting}
        />
      </Block>
      <Block container>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  onClick={clickAllCell}
                  indeterminate={
                    tempSelected.length > 0 &&
                    tempSelected.length < customers.length
                  }
                  checked={
                    tempSelected.length > 0 &&
                    tempSelected.length === customers.length
                  }
                />
              </TableCell>
              <TableCell>소속명</TableCell>
              <TableCell>관리자명</TableCell>
              <TableCell>이메일</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!isLoading &&
              customers.map(ele => {
                const isSelected = checkIdx(ele.customer_id) !== -1;
                return (
                  <TableRow key={ele.email}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onClick={e =>
                          clickCell(e, ele.member_count, ele.customer_id)
                        }
                      />
                    </TableCell>
                    <TableCell>{ele.company}</TableCell>
                    <TableCell>
                      {ele.last_name} {ele.first_name}
                    </TableCell>
                    <TableCell>{ele.email}</TableCell>
                  </TableRow>
                );
              })}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Block>
      <Block container justifyContent="center" mt="20px">
        <Pagination
          count={Math.ceil(count / limit)}
          page={sorting.offset + 1}
          onChange={changePage}
        />
      </Block>
    </Grid>
  );
};

export default MiniCustomerTable;
