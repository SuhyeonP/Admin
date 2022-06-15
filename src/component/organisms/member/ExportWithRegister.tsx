import React from 'react';
import { DialogTitle } from '@mui/material';
import { RegisterMember } from './dialog';
import { DoubleButton } from '~/src/component/atoms';
import { AddMemberIcon } from '~/src/asset/icons';
import { DoubleButtonWrapper } from '~/src/component/molecules/wrapper';
import { useAppDispatch } from '~/src/redux/hook';
import { globalActions } from '~/src/redux/slice';

const ExportWithRegister = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const addMember = React.useCallback(() => {
    dispatch(
      globalActions.showDialog({
        dialogVisible: true,
        element: (
          <>
            <DialogTitle>멤버 생성</DialogTitle>
            <RegisterMember />
          </>
        ),
        dialogSize: 'lg',
      }),
    );
  }, []);

  return (
    <DoubleButtonWrapper
      mb="16px"
      leftBtn={<DoubleButton>Export CSV</DoubleButton>}
      rightBtn={
        <DoubleButton onClick={addMember} is_right>
          <AddMemberIcon />
          &nbsp; 멤버 생성
        </DoubleButton>
      }
    />
  );
};

export default ExportWithRegister;
