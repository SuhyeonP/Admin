import React from 'react';
import { DialogTitle } from '@mui/material';
import { RegisterCompany } from './dialog';
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
            <DialogTitle>기업 생성</DialogTitle>
            <RegisterCompany />
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
          &nbsp; 기업 생성
        </DoubleButton>
      }
    />
  );
};

export default ExportWithRegister;
