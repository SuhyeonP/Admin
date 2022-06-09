import React from 'react';
import { DialogTitle } from '@mui/material';
import { DoubleButton } from '~/src/component/atoms';
import { AddMemberIcon } from '~/src/asset/icons';
import { DoubleButtonWrapper } from '~/src/component/molecules/wrapper';
import { useAppDispatch } from '~/src/redux/hook';
import { globalActions } from '~/src/redux/slice';
import {
  RegisterMember,
  RegisterCompany,
} from '~/src/component/organisms/form';

interface IProps {
  isCompany?: boolean;
}

const ExportWithRegister = ({ isCompany = false }: IProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = React.useState(isCompany ? '기업' : '회원');

  React.useEffect(() => {
    setTitle(isCompany ? '기업' : '회원');
  }, [isCompany]);

  const addMember = React.useCallback(() => {
    dispatch(
      globalActions.showDialog({
        dialogVisible: true,
        element: (
          <>
            <DialogTitle>{title} 생성</DialogTitle>
            {title === '기업' ? <RegisterCompany /> : <RegisterMember />}
          </>
        ),
        dialogSize: 'lg',
      }),
    );
  }, [title]);

  return (
    <DoubleButtonWrapper
      mb="16px"
      leftBtn={<DoubleButton>Export CSV</DoubleButton>}
      rightBtn={
        <DoubleButton onClick={addMember} is_right>
          <AddMemberIcon />
          &nbsp; {title} 생성
        </DoubleButton>
      }
    />
  );
};

export default ExportWithRegister;
