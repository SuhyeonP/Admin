import React from 'react';
import { MembersTable } from '~/src/component/organisms/table';
import { TitleWithEditWrapper } from '~/src/component/molecules/wrapper';

const CompanyMemberInfo = (): JSX.Element => {
  const addMember = React.useCallback(() => {
    // todo open dialog of add emmber
    console.log('sdfklj');
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
