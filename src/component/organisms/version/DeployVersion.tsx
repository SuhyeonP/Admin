import React from 'react';
import { DeployDialog } from './dialog';
import { DoubleButton } from '~/src/component/atoms';
import { AddPaperIcon } from '~/src/asset/icons';
import { DoubleButtonWrapper } from '~/src/component/molecules/wrapper';
import { useAppDispatch } from '~/src/redux/hook';
import { globalActions } from '~/src/redux/slice';

const DeployVersion = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const openDialog = () => {
    dispatch(
      globalActions.showDialog({
        dialogVisible: true,
        element: <DeployDialog />,
        dialogSize: 'md',
      }),
    );
  };

  return (
    <DoubleButtonWrapper
      mb="16px"
      rightBtn={
        <DoubleButton onClick={openDialog} is_right>
          <AddPaperIcon />
          &nbsp;배포 등록
        </DoubleButton>
      }
    />
  );
};

export default DeployVersion;
