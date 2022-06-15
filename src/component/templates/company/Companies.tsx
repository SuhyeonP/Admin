import React from 'react';
import { SubTitle } from '~/src/component/atoms';
import {
  CompaniesTable,
  CompanyOption,
  ExportWithRegister,
} from '~/src/component/organisms/company';

const Companies = (): JSX.Element => {
  return (
    <>
      <SubTitle>기업 목록</SubTitle>
      <ExportWithRegister />
      <CompanyOption />
      <CompaniesTable />
    </>
  );
};

export default Companies;
