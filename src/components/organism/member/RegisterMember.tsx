import React from 'react';
import { Button, Typography } from '@mui/material';
import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import {
  IMemberID,
  IRegisterSuccessInfo,
  IResponseMember,
  memberStore,
} from '~/model/store';
import {
  initialError,
  IPersonInfo,
  memberInit,
  ReactSetState,
  registerMemberInfo,
} from '~/model/common';
import { BasicRegister } from '~/components/common/register';
import {
  DialogActionLayout,
  DialogContentLayout,
} from '~/components/common/globalContent';
import { AuthContext, GlobalContext } from '~/model';
import { IResponseData } from '~/api/customAPI';
import { checkErr } from '~/api/checkErr';
import { checkNameError, emailRegExp, length30, pnc } from '~/util/regExp';

interface IProps {
  selected: IResponseMember[];
  isRegister: boolean;
  id: number;
  setRefetch: ReactSetState<boolean>;
}

const RegisterMember = ({
  selected,
  isRegister,
  id,
  setRefetch,
}: IProps): JSX.Element => {
  const { closeDialog } = React.useContext(GlobalContext);
  const { logout } = React.useContext(AuthContext);

  const [memberData, setMemberData] = React.useState<IResponseMember>(
    isRegister ? memberInit : selected[0],
  );
  const [checkForm, setCheckForm] = React.useState(initialError);

  const [changeContent, setChangeContent] = React.useState(false);
  const [successRegister, setSuccessRegister] =
    React.useState<IRegisterSuccessInfo>(registerMemberInfo);

  const cancel = React.useCallback(() => {
    closeDialog();
    setMemberData(memberInit);
    setRefetch(true);
  }, []);

  const editMemberMutation = useMutation<
    IResponseData<Record<'ok', number>>,
    AxiosError,
    any
  >(memberStore.editMember, {
    onSuccess: res => {
      if (res.ok) {
        cancel();
      }
    },
    onError: err => {
      const checkError = checkErr(err);
      if (checkError.tokenInValid) {
        logout();
      }
    },
  });

  const registerMutation = useMutation<
    IResponseData<IRegisterSuccessInfo>,
    AxiosError,
    any
  >(memberStore.registerMember, {
    onSuccess: res => {
      if (res.ok) {
        // cancel();
        // todo show license
        const { result } = res;
        setChangeContent(true);
        setSuccessRegister({
          last_name: result.last_name,
          first_name: result.first_name,
          member_license_key: result.member_license_key,
        });
      }
    },
    onError: err => {
      const checkError = checkErr(err);
      if (checkError.tokenInValid) {
        logout();
      }
    },
  });

  const settingMemberData = React.useCallback(data => {
    setMemberData(data);
  }, []);

  const submit = React.useCallback(
    e => {
      e.preventDefault();

      if (memberData.phone_number === '') {
        delete memberData['phone_number'];
      }

      const { last_name, first_name, email, job_title, phone_number } =
        memberData;

      const nameCheck = checkNameError(last_name, first_name);
      const check = [
        ...nameCheck,
        !emailRegExp.test(email),
        !length30.test(job_title),
        phone_number ? !pnc.test(phone_number) : false,
      ];

      if (check.every(item => !item)) {
        if (isRegister) {
          const temp = {
            ...memberData,
            customer_id: id,
          };
          registerMutation.mutate(temp);
        } else {
          const temp = {
            ...memberData,
            member_id: id,
          };
          editMemberMutation.mutate(temp);
        }
      } else {
        const temp = {
          ...initialError,
        };

        if (check[0]) {
          temp['last_name'] = {
            isError: true,
            msg: '잘못된 이름입니다.',
          };
        }
        if (check[1]) {
          temp['first_name'] = {
            isError: true,
            msg: '잘못된 성입니다.',
          };
        }
        if (check[2]) {
          temp['email'] = {
            isError: true,
            msg: '잘못된 이메일입니다.',
          };
        }
        if (check[3]) {
          temp['job_title'] = {
            isError: true,
            msg: '잘못된 직업입니다.',
          };
        }
        if (check[4]) {
          temp['phone_number'] = {
            isError: true,
            msg: '잘못된 번호입니다.',
          };
        }
        setCheckForm(temp);
      }
    },
    [memberData, isRegister, id],
  );

  return (
    <>
      <DialogContentLayout>
        {!changeContent && (
          <BasicRegister
            checkError={checkForm}
            settingManagerInfo={settingMemberData}
            editInfo={memberData}
          />
        )}
        {changeContent && (
          <>
            <Typography>
              {successRegister.last_name} {successRegister.first_name}의
              라이센스 코드는{' '}
            </Typography>
            <Typography>
              {successRegister.member_license_key} 입니다.
            </Typography>
          </>
        )}
      </DialogContentLayout>
      <DialogActionLayout>
        <Button onClick={cancel}>{changeContent ? '확인' : '취소'}</Button>
        {!changeContent && (
          <Button onClick={submit}>{isRegister ? '등록' : '수정'}</Button>
        )}
      </DialogActionLayout>
    </>
  );
};

export default RegisterMember;
