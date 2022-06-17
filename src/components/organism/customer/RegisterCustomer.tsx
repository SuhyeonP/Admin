import React from 'react';
import { Button, Grid } from '@mui/material';
import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { customerStore, ICustomer } from '~/model/store';
import {
  customerInit,
  initialError,
  IPersonInfo,
  IRefresh,
  ReactSetState,
} from '~/model/common';
import {
  DialogActionLayout,
  DialogContentLayout,
} from '~/components/common/globalContent';
import { BasicRegister, CompanyRegister } from '~/components/common/register';
import { GlobalContext } from '~/model/globalModel';
import { IResponseData } from '~/api/customAPI';
import { checkErr } from '~/api/checkErr';
import { AuthContext } from '~/model';
import {
  checkNameError,
  emailRegExp,
  length30,
  length50,
  pnc,
} from '~/util/regExp';

interface IProps {
  setRefresh: ReactSetState<IRefresh>;
}

const RegisterCustomer = ({ setRefresh }: IProps): JSX.Element => {
  const { closeDialog, controlSnackbar } = React.useContext(GlobalContext);
  const { logout } = React.useContext(AuthContext);

  const [managerInfo, setManagerInfo] = React.useState<ICustomer>(customerInit);

  const [checkFormErr, setCheckFormErr] = React.useState(initialError);

  const closeInitDialog = React.useCallback(() => {
    setManagerInfo(customerInit);
    setCheckFormErr(initialError);
    closeDialog();
  }, []);

  const registerMutation = useMutation<
    IResponseData<Record<'customer_id', number>>,
    AxiosError,
    any
  >(customerStore.registerCustomer, {
    onSuccess: data => {
      const { ok, err } = data;
      controlSnackbar({
        view: true,
        severity: ok ? 'success' : 'error',
        msg: ok
          ? 'customer 등록이 완료 되었습니다.'
          : err.code === 'CustomerDuplicated'
          ? '중복된 사용자 입니다.'
          : 'err',
      });
      if (ok) {
        setRefresh({
          make: true,
          type: 'register',
        });
        closeInitDialog();
      }
    },
    onError: err => {
      const checkError = checkErr(err);
      if (checkError.tokenInValid) {
        logout();
      }
    },
  });

  const registerCustomer = React.useCallback(() => {
    if (managerInfo.phone_number === '') {
      delete managerInfo['phone_number'];
    }

    const {
      company,
      member_max,
      job_title,
      phone_number,
      email,
      first_name,
      last_name,
    } = managerInfo;
    const nameCheck = checkNameError(last_name, first_name);
    const check = [
      !length50.test(company),
      member_max <= 0,
      ...nameCheck,
      !emailRegExp.test(email),
      !length30.test(job_title),
      phone_number ? !pnc.test(phone_number) : false,
    ];

    if (check.every(item => !item)) {
      registerMutation.mutate(managerInfo);
    } else {
      const temp = {
        ...initialError,
      };

      if (check[0]) {
        temp['company'] = {
          isError: true,
          msg: '잘못된 않은 형식입니다.',
        };
      }
      if (check[1]) {
        temp['member_max'] = {
          isError: true,
          msg: '필수 입력 입니다.',
        };
      }

      if (check[2]) {
        temp['last_name'] = {
          isError: true,
          msg: '잘못된 이름 입니다.',
        };
      }

      if (check[3]) {
        temp['first_name'] = {
          isError: true,
          msg: '잘못된 성 입니다.',
        };
      }

      if (check[4]) {
        temp['email'] = {
          isError: true,
          msg: '잘못된 이메일 입니다.',
        };
      }

      if (check[5]) {
        temp['job_title'] = {
          isError: true,
          msg: '잘못된 직업 입니다.',
        };
      }

      if (check[6]) {
        temp['phone_number'] = {
          isError: true,
          msg: '잘못된 번호 입니다.',
        };
      }

      setCheckFormErr(temp);
    }
  }, [managerInfo]);

  const settingCustomerInfo = React.useCallback((data: ICustomer) => {
    setManagerInfo(data);
  }, []);

  const settingManagerInfo = React.useCallback(
    (data: IPersonInfo) => {
      const { company, member_max, license_class, customer_type } = managerInfo;

      const temp: ICustomer = {
        last_name: data.last_name,
        first_name: data.first_name,
        job_title: data.job_title,
        phone_number: data.phone_number,
        email: data.email,
        company,
        member_max,
        license_class,
        customer_type,
      };
      setManagerInfo(temp);
    },
    [managerInfo],
  );

  return (
    <>
      <DialogContentLayout>
        <Grid container sx={{ maxWidth: '505px', width: '505px' }}>
          <CompanyRegister
            settingCustomerInfo={settingCustomerInfo}
            managerInfo={managerInfo}
            checkError={checkFormErr}
          />
          <BasicRegister
            settingManagerInfo={settingManagerInfo}
            editInfo={customerInit}
            checkError={checkFormErr}
            isManager
          />
        </Grid>
      </DialogContentLayout>
      <DialogActionLayout>
        <Button onClick={closeInitDialog}>취소</Button>
        <Button onClick={registerCustomer}>등록</Button>
      </DialogActionLayout>
    </>
  );
};
export default RegisterCustomer;
