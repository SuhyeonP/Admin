import React from 'react';
import ContainMember from './dialog/ContainMember';
import { TitleWithEditWrapper } from '~/src/component/molecules/wrapper';
import { useAppDispatch } from '~/src/redux/hook';
import { globalActions } from '~/src/redux/slice';
import { MembersTable } from '~/src/component/organisms/member';

const CompanyMemberInfo = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const addMember = React.useCallback(() => {
    dispatch(
      globalActions.showDialog({
        dialogVisible: true,
        element: <ContainMember />,
        dialogSize: 'lg',
      }),
    );
  }, []);

  return (
    <TitleWithEditWrapper
      title="구성원"
      notUsedStyle
      toggle={addMember}
      isEditable={false}
      isAddMode
    >
      <MembersTable />
    </TitleWithEditWrapper>
  );
};

export default CompanyMemberInfo;
