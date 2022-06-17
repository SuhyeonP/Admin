import React from 'react';
import { Button, ButtonGroup } from '@mui/material';
import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { Block } from '~/components/common/styleMui';
import { AuthContext, GlobalContext, MemberContext } from '~/model';
import { MemberSelectedContext } from '~/model/memberModel';
import { RegisterMember } from '~/components/organism/member';
import { DeleteDialog } from '~/components/common/globalContent';
import { memberStore } from '~/model/store';
import { checkErr } from '~/api/checkErr';
import { IResponseData } from '~/api/customAPI';

const ControlMembers = (): JSX.Element => {
  const { logout } = React.useContext(AuthContext);
  const { controlDialog, controlSnackbar, closeDialog } =
    React.useContext(GlobalContext);
  const {
    customer_id,
    state: customerMM,
    setRefetch,
  } = React.useContext(MemberContext);
  const { state: selected, setState: setSelected } = React.useContext(
    MemberSelectedContext,
  );

  const registerMember = React.useCallback(
    (isRegister: boolean) => () => {
      if (isRegister) {
        if (customerMM.mm <= customerMM.mc) {
          controlSnackbar({
            view: true,
            severity: 'error',
            msg: '멤버수 초과입니다.',
          });
          return;
        }
      }

      if (!isRegister && selected.length === 0) {
        controlSnackbar({
          view: true,
          severity: 'warning',
          msg: '선택된 멤버가 없습니다.',
        });
        return;
      }

      controlDialog({
        view: true,
        title: isRegister ? '멤버 등록' : '멤버 수정',
        mainContent: (
          <RegisterMember
            selected={selected}
            isRegister={isRegister}
            id={isRegister ? customer_id : selected[0].member_id}
            setRefetch={setRefetch}
          />
        ),
      });
    },
    [selected, customer_id, customerMM],
  );

  const deleteMutation = useMutation<
    IResponseData<Record<'member_ids', number>>,
    AxiosError,
    any
  >(memberStore.deleteMember, {
    onSuccess: res => {
      if (res.ok) {
        setRefetch(true);
        setSelected([]);
        closeDialog();
      } else {
        const { err } = res;
        controlSnackbar({
          view: true,
          severity: 'error',
          msg: err.code,
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

  const deleteMembers = React.useCallback(() => {
    const deleteMemberIds = selected.map(mem => mem.member_id);
    controlDialog({
      view: true,
      title: '멤버 삭제',
      mainContent: (
        <DeleteDialog
          txt="멤버를"
          cancel={closeDialog}
          action={() => deleteMutation.mutate(deleteMemberIds)}
        />
      ),
    });
  }, [selected]);

  return (
    <Block container justifyContent="space-between" sx={{ mt: 2, mb: 2 }}>
      <ButtonGroup sx={{ mr: 2 }}>
        <Button onClick={registerMember(false)}>수정</Button>
        <Button onClick={deleteMembers}>삭제</Button>
      </ButtonGroup>
      <Button onClick={registerMember(true)}>+ 멤버등록</Button>
    </Block>
  );
};

export default ControlMembers;
