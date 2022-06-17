import React from 'react';
import { Box, Button, ButtonGroup, Grid } from '@mui/material';
import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import SearchForm from '~/components/organism/customer/SearchForm';
import {
  customerStore,
  ICustomerIds,
  IUserActionListRequest,
} from '~/model/store/customersStore';
import SortingCustomerTable from '~/components/common/sortingData/SortingCustomerTable';
import PeriodForm from '~/components/organism/customer/PeriodForm';
import CustomerTable from '~/components/organism/customer/CustomerTable';
import { GlobalContext } from '~/model/globalModel';
import { RegisterCustomer } from '~/components/organism/customer';
import { DeleteDialog } from '~/components/common/globalContent';
import { IResponseData } from '~/api/customAPI';
import { checkErr } from '~/api/checkErr';
import { AuthContext, CustomerContext } from '~/model';
import { IRefresh, periodList } from '~/model/common';

const ManageCustomers = (): JSX.Element => {
  const { controlDialog, closeDialog, controlSnackbar } =
    React.useContext(GlobalContext);
  const { logout } = React.useContext(AuthContext);

  const [selected, setSelected] = React.useState<number[]>([]);
  const [request, setRequest] = React.useState<IUserActionListRequest>({
    total: true,
    offset: 0,
    limit: 10,
    sort: [
      {
        col: 'customer_id',
        asc: true,
      },
    ],
    date_range: periodList['thisMonth'],
  });

  const [refresh, setRefresh] = React.useState<IRefresh>({
    make: false,
    type: '',
  });

  const settingCustomersDetail = React.useCallback(
    (data: IUserActionListRequest) => {
      setRequest(data);
    },
    [],
  );

  const deleteMutation = useMutation<
    IResponseData<ICustomerIds>,
    AxiosError,
    any
  >(customerStore.removeCustomers, {
    onSuccess: data => {
      const { ok } = data;

      if (ok) {
        setRefresh({
          make: true,
        });
      }

      controlSnackbar({
        view: true,
        severity: ok ? 'success' : 'error',
        msg: ok ? '삭제가 완료되었습니다.' : '없는 사용자 입니다.',
      });
      closeDialog();
      setSelected([]);
    },
    onError: err => {
      const checkError = checkErr(err);
      if (checkError.tokenInValid) {
        logout();
      }
    },
  });

  const openDeleteCustomer = React.useCallback(() => {
    controlDialog({
      view: true,
      title: '회원 삭제',
      mainContent: (
        <DeleteDialog
          txt="단체 또는 개인을"
          cancel={closeDialog}
          action={() => deleteMutation.mutate(selected)}
        />
      ),
    });
  }, [selected]);

  const openRegisterCustomer = React.useCallback(() => {
    controlDialog({
      view: true,
      title: '회원 등록',
      mainContent: <RegisterCustomer setRefresh={setRefresh} />,
    });
  }, []);

  return (
    <CustomerContext.Provider
      value={{
        refresh,
        setRefresh,
      }}
    >
      <Grid container>
        <Box
          alignItems="center"
          justifyContent="space-between"
          display="flex"
          width="100%"
        >
          <SearchForm
            sorting={request}
            settingCustomersDetail={settingCustomersDetail}
          />
          <PeriodForm
            sorting={request}
            settingCustomersDetail={settingCustomersDetail}
          />
        </Box>
        <Grid container>
          <Grid
            container
            alignItems="center"
            mt={3}
            justifyContent="space-between"
          >
            <SortingCustomerTable
              settingCustomersDetail={settingCustomersDetail}
              sorting={request}
            />
          </Grid>
        </Grid>
        <Grid container justifyContent="space-between" mt="20px">
          <ButtonGroup sx={{ mr: 3 }}>
            <Button onClick={openDeleteCustomer}>삭제</Button>
          </ButtonGroup>
          <Button onClick={openRegisterCustomer}>+ 소속등록</Button>
        </Grid>
        <Grid item container sx={{ pt: 4 }}>
          <CustomerTable
            settingCustomersDetail={settingCustomersDetail}
            sorting={request}
            selected={selected}
            setSelected={setSelected}
          />
        </Grid>
      </Grid>
    </CustomerContext.Provider>
  );
};

export default ManageCustomers;
