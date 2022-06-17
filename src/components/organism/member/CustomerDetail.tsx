import React from 'react';
import { useMutation, useQuery } from 'react-query';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useInput } from 'custom-hook-react';
import { AxiosError } from 'axios';
import {
  customerStore,
  ICustomerId,
  IResponseCustomer,
  IWriteCustomer,
  licenseObject,
} from '~/model/store';
import { Block } from '~/components/common/styleMui';
import { ControlRuleInput } from '~/components/common/controlRuleInput';
import { SelectGrade, SelectGroup } from '~/components/common/register/select';
import {
  IFormInputError,
  initialError,
  makeDateForm,
  ReactSetState,
  responseCustomerInit,
} from '~/model/common';
import { checkErr } from '~/api/checkErr';
import { AuthContext, GlobalContext, MemberContext } from '~/model';
import { IResponseData } from '~/api/customAPI';
import { length50 } from '~/util/regExp';

interface IProps {
  setCustomerMM: ReactSetState<Record<string, number>>;
}

const CustomerDetail = (): JSX.Element => {
  const { customer_id, setState } = React.useContext(MemberContext);
  const { logout } = React.useContext(AuthContext);

  const { controlSnackbar } = React.useContext(GlobalContext);

  const [editable, setEditable] = React.useState(false);
  const [customer, setCustomer] =
    React.useState<IResponseCustomer>(responseCustomerInit);

  const [company, onChangeCompany, setCompany] = useInput('');
  const [member_max, setMM] = React.useState(0);

  const [checkForm, setCheckForm] =
    React.useState<Record<'company' | 'member_max', IFormInputError>>(
      initialError,
    );

  const { isLoading, data, error, refetch } = useQuery<
    any,
    AxiosError,
    IResponseData<Record<'customer', IResponseCustomer>>
  >(
    ['getCustomer', customer_id],
    async () => await customerStore.getCustomer(customer_id),
    {
      enabled: !isNaN(customer_id),
      retry: false,
    },
  );

  const editCustomerMutation = useMutation<
    IResponseData<IWriteCustomer>,
    AxiosError,
    any
  >(customerStore.editCustomer, {
    onSuccess: response => {
      // todo check scenario
      refetch();
      setEditable(false);
      controlSnackbar({
        view: true,
        severity: 'success',
        msg: '수정하였습니다.',
      });
    },
    onError: err => {
      const checkError = checkErr(err);
      if (checkError.tokenInValid) {
        logout();
      }
    },
  });

  React.useLayoutEffect(() => {
    if (error) {
      const checkError = checkErr(error);
      if (checkError.tokenInValid) {
        logout();
      }
    } else if (data) {
      if (data.ok) {
        const result = data.result.customer;
        setCustomer(result);
        setCompany(result.company);
        setMM(result.member_max);
        setState({
          mm: result.member_max,
          mc: result.member_count,
        });
      }
    }
  }, [data, error]);

  const editCustomer = React.useCallback(() => {
    setEditable(true);
  }, [editable]);

  const editFixCustomer = React.useCallback(
    e => {
      e.preventDefault();
      const check = !length50.test(company);
      if (check) {
        setCheckForm(prev => {
          return {
            ...prev,
            company: {
              isError: check,
              msg: '잘못된 입력입니다.',
            },
          };
        });
      } else {
        setCheckForm(initialError);
        const send: IWriteCustomer = customer;
        setCustomer(prev => {
          send['company'] = company;
          send['member_max'] = member_max;
          return {
            ...prev,
            company,
          };
        });
        editCustomerMutation.mutate(send);
      }
    },
    [company, member_max, customer],
  );

  const settingUnknown = React.useCallback((data: unknown) => {
    //
  }, []);

  const settingGrade = React.useCallback(
    (grade: keyof typeof licenseObject) => {
      setCustomer(prev => {
        return {
          ...prev,
          license_class: grade,
        };
      });
    },
    [],
  );

  const onChangeMM = React.useCallback(
    e => {
      const registerMembers = customer.member_count;
      const counting = parseInt(e.target.value || registerMembers, 10);
      if (counting < 0) {
        setMM(1);
      } else {
        setMM(counting);

        if (registerMembers > counting) {
          setMM(registerMembers);
          setCheckForm(prev => {
            return {
              ...prev,
              member_max: {
                isError: true,
                msg: '등록된 멤버 수 보다 적습니다.',
              },
            };
          });
        } else {
          setCheckForm(prev => {
            return {
              ...prev,
              member_max: {
                isError: false,
                msg: '',
              },
            };
          });
        }
      }
    },
    [customer.member_count],
  );

  return (
    <Box sx={{ width: '100%' }}>
      {!isLoading && (
        <Grid container>
          <Block container justifyContent="flex-end">
            <Button onClick={editable ? editFixCustomer : editCustomer}>
              {editable ? 'Fix' : 'Edit'}
            </Button>
          </Block>
          <Grid container p={5} border="1px solid #bdbdbd" mb={4}>
            <Block container spacing={2} alignItems="center">
              <Grid item xs={1.2}>
                <Typography>소속정보</Typography>
              </Grid>
              <Grid item xs={3.6}>
                <ControlRuleInput
                  value={company}
                  onChange={onChangeCompany}
                  title="소속명"
                  disable={!editable}
                  error={checkForm['company']}
                />
              </Grid>
              <Grid item xs={3.6} mb="20px">
                <Typography mb="10px">유형</Typography>
                <Grid container>
                  <SelectGroup
                    customer_type={customer.customer_type}
                    settingGroup={settingUnknown}
                    disabled={true}
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid item xs={3.6} mb="20px">
                <Typography mb="10px">등급</Typography>
                <SelectGrade
                  isTeam={customer.customer_type === 'Personal'}
                  settingGrade={settingGrade}
                  grade={customer.license_class}
                  fullWidth
                  disabled={!editable}
                />
              </Grid>
            </Block>
            <Block container spacing={2} alignItems="center">
              <Grid item xs={1.2}>
                <Typography>소속정보</Typography>
              </Grid>
              <Grid xs={3.6} item mb="20px">
                <ControlRuleInput
                  disable
                  title="라이센스 등록일"
                  value={makeDateForm(customer.issue_date)}
                  onChange={settingUnknown}
                />
              </Grid>
              <Grid xs={3.6} item mb="20px">
                <ControlRuleInput
                  disable
                  title="라이센스 만료일"
                  value={makeDateForm(customer.expiration_date)}
                  onChange={settingUnknown}
                />
              </Grid>
              <Grid xs={3.6} item mb="20px">
                <ControlRuleInput
                  value={member_max}
                  onChange={onChangeMM}
                  title="총 라이센스 수"
                  disable={!editable || customer.customer_type === 'Enterprise'}
                  error={checkForm['member_max']}
                />
              </Grid>
            </Block>
            <Block container spacing={2} alignItems="center">
              <Grid xs={1.2} item>
                <Typography>관리자 정보</Typography>
              </Grid>
              <Grid xs={2.7} item>
                <ControlRuleInput
                  value={customer.last_name + ' ' + customer.first_name}
                  onChange={settingUnknown}
                  title="관리자 이름"
                  disable
                />
              </Grid>
              <Grid xs={2.7} item>
                <ControlRuleInput
                  value={customer.email}
                  onChange={settingUnknown}
                  title="관리자 이메일"
                  disable
                />
              </Grid>
              <Grid xs={2.7} item>
                <ControlRuleInput
                  value={customer.job_title}
                  onChange={settingUnknown}
                  title="관리자 직무"
                  disable
                />
              </Grid>
              <Grid xs={2.7} item>
                <ControlRuleInput
                  value={customer.phone_number || ''}
                  onChange={settingUnknown}
                  title="관리자 전화번호"
                  disable
                />
              </Grid>
            </Block>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default CustomerDetail;
