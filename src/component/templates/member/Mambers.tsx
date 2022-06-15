import React from 'react';
import { SubTitle } from '~/src/component/atoms';
import {
  MembersTable,
  MembersOption,
  ExportWithRegister,
} from '~/src/component/organisms/member';

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
