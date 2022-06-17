import React from 'react';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import {
  Box,
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { useNavigate } from 'react-router-dom';
import {
  customerStore,
  ICustomerDataProps,
  IResponseCustomer,
  IUserActionListRequest,
  userStore,
} from '~/model/store';
import { AuthContext, CustomerContext } from '~/model';
import { checkErr } from '~/api/checkErr';
import {
  IListDataResponse,
  ISortInfo,
  makeDateForm,
  ReactSetState,
} from '~/model/common';

const sortableHeadCell = [
  {
    id: 'customer_type',
    label: '구분',
  },
  {
    id: 'name',
    label: '관리자명',
  },
  {
    id: 'email',
    label: '관리자 이메일',
  },
  {
    id: 'company',
    label: '소속명',
  },
  {
    id: 'license_class',
    label: '등급',
  },
  {
    id: 'issue_date',
    label: '라이센스 시작일',
  },
  {
    id: 'expiration_date',
    label: '라이센스 만료일',
  },
  {
    id: 'customer_license_state',
    label: '상태',
  },
  {
    id: 'member_max',
    label: '총 라이센스 수',
  },
];

interface IProps extends ICustomerDataProps {
  selected: number[];
  setSelected: ReactSetState<number[]>;
}
//total: boolean;
//   customer_type?: CustomerType;
//   customer_license_state?: LicenseState;
//   license_class?: keyof typeof licenseObject;
//   date_range?: Date[];
//   search?: string;
const CustomerTable = ({
  settingCustomersDetail,
  sorting,
  selected,
  setSelected,
}: IProps): JSX.Element => {
  const navigate = useNavigate();

  const { logout } = React.useContext(AuthContext);
  const { refresh, setRefresh } = React.useContext(CustomerContext);

  const [customers, setCustomers] = React.useState<IResponseCustomer[]>([]);
  const [length, setLength] = React.useState<number>(0);
  const [offset, setOffset] = React.useState<number>(sorting.offset || 0);
  const [limit, setLimit] = React.useState<number>(sorting.limit || 10);

  const [sort, setSort] = React.useState<ISortInfo>(sorting.sort[0]);

  const {
    isLoading,
    data: customerList,
    error,
    refetch: listRefetch,
  } = useQuery(
    ['customers', sorting],
    async () =>
      await customerStore.getCustomerList<IListDataResponse<IResponseCustomer>>(
        sorting,
      ),
    {
      retry: false,
      enabled: userStore.isAuthorized,
      staleTime: 5000,
      keepPreviousData: true,
    },
  );

  React.useEffect(() => {
    if (refresh.make) {
      if (refresh.type === 'register') {
        setSort({
          col: 'customer_id',
          asc: false,
        });
        const temp = {
          ...sorting,
          sort: [
            {
              col: 'customer_id',
              asc: false,
            },
          ],
        };
        settingCustomersDetail(temp as IUserActionListRequest);
        setRefresh({
          make: false,
          type: '',
        });
      } else {
        listRefetch();
      }
    }
  }, [refresh, sorting]);

  React.useEffect(() => {
    if (error) {
      const check = checkErr(error as AxiosError);
      if (check.tokenInValid) {
        logout();
      }
    } else if (customerList) {
      if (customerList.ok) {
        setCustomers(customerList.result.items);
        setLength(customerList.result.total_count);

        setRefresh({
          make: false,
          type: '',
        });
      }
    }
  }, [error, customerList]);

  const count = React.useMemo(() => {
    if (isLoading) {
      return 1;
    } else if (customerList) {
      return customerList.ok ? length : 1;
    } else {
      return 1;
    }
  }, [isLoading, customerList, length]);

  const emptyRows = React.useMemo(() => {
    if (isLoading || !customerList) {
      return limit;
    } else if (customerList.ok) {
      return length === limit ? 0 : limit - customers.length;
    } else {
      return limit;
    }
  }, [isLoading, customerList, limit, offset, length, customers]);

  const sortHandler = React.useCallback(
    (property: string) => {
      let change = {};
      if (sort.col === property) {
        change = {
          col: property,
          asc: !sort.asc,
        };
        setSort(prev => {
          return {
            ...prev,
            asc: !prev.asc,
          };
        });
      } else {
        setSort({
          col: property,
          asc: true,
        });
        change = {
          col: property,
          asc: true,
        };
      }

      const temp = {
        ...sorting,
        sort: [change],
      };
      settingCustomersDetail(temp as IUserActionListRequest);
    },
    [sorting, sort],
  );

  const handlePage = React.useCallback(
    (event: unknown, newPage: number) => {
      setOffset(newPage);
      const temp: IUserActionListRequest = {
        ...sorting,
        offset: newPage,
      };
      settingCustomersDetail(temp);
    },
    [sorting],
  );

  const handleLimit = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const limitTemp = parseInt(event.target.value, 10);
      setOffset(0);
      setLimit(limitTemp);
      const temp: IUserActionListRequest = {
        ...sorting,
        offset: 0,
        limit: limitTemp,
      };
      settingCustomersDetail(temp);
    },
    [sorting],
  );

  const checkSelectOrderBy = React.useCallback(
    (head: string) => {
      return sort.col === head;
    },
    [sort],
  );

  const clickAllCell = React.useCallback(
    e => {
      if (e.target.checked) {
        setSelected(customers.map(ele => ele.customer_id));
      } else {
        setSelected([]);
      }
    },
    [customers],
  );

  const clickCell = React.useCallback(
    (e: React.MouseEvent<unknown>, id: number) => {
      setSelected(prev => {
        if (prev.includes(id)) {
          prev.splice(prev.indexOf(id), 1);
        } else {
          prev.push(id);
        }
        return prev.map(ele => ele);
      });
    },
    [],
  );

  const getCustomer = React.useCallback(
    (id: number) => () => {
      navigate('/detail/' + id);
    },
    [],
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    indeterminate={
                      isLoading
                        ? false
                        : selected.length > 0 &&
                          selected.length < customers.length
                    }
                    checked={
                      isLoading
                        ? false
                        : customers.length > 0 &&
                          selected.length === customers.length
                    }
                    onChange={clickAllCell}
                  />
                </TableCell>
                {sortableHeadCell.map(headCell => {
                  const id = headCell.id;
                  const same = checkSelectOrderBy(id);
                  return (
                    <TableCell
                      key={id}
                      sortDirection={same ? (sort.asc ? 'asc' : 'desc') : false}
                    >
                      <TableSortLabel
                        active={same}
                        onClick={() => sortHandler(id)}
                        direction={same ? (sort.asc ? 'asc' : 'desc') : 'asc'}
                      >
                        {headCell.label}
                        {same ? (
                          <Box component="span" sx={visuallyHidden}>
                            {sort.asc
                              ? 'sorted ascending'
                              : 'sorted descending'}
                          </Box>
                        ) : null}
                      </TableSortLabel>
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {!isLoading &&
                customers &&
                customers.map(item => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={item.email}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={selected.includes(item.customer_id)}
                          onClick={event => clickCell(event, item.customer_id)}
                        />
                      </TableCell>
                      <TableCell>{item.customer_type}</TableCell>
                      <TableCell>
                        {item.last_name} {item.first_name}
                      </TableCell>
                      <TableCell
                        onClick={getCustomer(item.customer_id)}
                        sx={{ cursor: 'pointer' }}
                      >
                        {item.email}
                      </TableCell>
                      <TableCell>{item.company}</TableCell>
                      <TableCell>{item.license_class}</TableCell>
                      <TableCell>{makeDateForm(item.issue_date)}</TableCell>
                      <TableCell>
                        {makeDateForm(item.expiration_date)}
                      </TableCell>
                      <TableCell>
                        {item.customer_license_state === 'Valid'
                          ? '사용중'
                          : '만료'}
                      </TableCell>
                      <TableCell>{item.member_max}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          count={count}
          page={offset}
          onPageChange={handlePage}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 20, 30]}
          onRowsPerPageChange={handleLimit}
        />
      </Paper>
    </Box>
  );
};

export default React.memo(CustomerTable);
