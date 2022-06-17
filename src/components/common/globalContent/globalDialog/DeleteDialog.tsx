import React from 'react';
import { Button, DialogContentProps, Typography } from '@mui/material';
import {
  DialogActionLayout,
  DialogContentLayout,
} from '~/components/common/globalContent';
import { ExtendOmit, IVoid } from '~/model/common';

interface IProps extends ExtendOmit<DialogContentProps> {
  txt: string;
  cancel: IVoid;
  action: IVoid;
}

const DeleteDialog = ({
  txt,
  cancel,
  action,
  ...props
}: IProps): JSX.Element => {
  return (
    <>
      <DialogContentLayout {...props}>
        <Typography>선택하신 {txt} 삭제하시겠습니까?</Typography>
        <Typography>삭제하면 다시 복구할수 없습니다.</Typography>
      </DialogContentLayout>
      <DialogActionLayout>
        <Button onClick={cancel}>취소</Button>
        <Button onClick={action}>삭제</Button>
      </DialogActionLayout>
    </>
  );
};
export default DeleteDialog;
