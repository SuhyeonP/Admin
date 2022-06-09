import React from 'react';
import { SubTitle } from '~/src/component/atoms';
import { MembersOption } from '~/src/component/organisms/fileterOptions';
import { ExportWithRegister } from '~/src/component/molecules/buttons';
import { MembersTable } from '~/src/component/organisms/table';

const Members = (): JSX.Element => {
  return (
    <>
      <SubTitle>회원 목록</SubTitle>
      <ExportWithRegister />
      <MembersOption />
      <MembersTable isMainList />
    </>
  );
};

export default Members;
