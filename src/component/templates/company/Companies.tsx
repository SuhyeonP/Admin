import React from 'react';
import { CompanyOption } from '~/src/component/organisms/fileterOptions';
import { SubTitle } from '~/src/component/atoms';
import { ExportWithRegister } from '~/src/component/molecules/buttons';
import { CompaniesTable } from '~/src/component/organisms/table';

const Companies = (): JSX.Element => {
  return (
    <>
      <SubTitle>기업 목록</SubTitle>
      <ExportWithRegister isCompany />
      <CompanyOption />
      <CompaniesTable />
    </>
  );
};

export default Companies;
