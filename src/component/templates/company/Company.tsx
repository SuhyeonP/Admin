import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Divider, DoubleButton } from '~/src/component/atoms';
import { CompanyBasic, PlanBlock } from '~/src/component/molecules/info';
import { UnderBtn } from '~/src/component/molecules/buttons';
import { CompanyMemberInfo } from '~/src/component/organisms/company';

const Company = (): JSX.Element => {
  const params = useParams().detail;
  const navigate = useNavigate();

  const [companyId, setCompanyId] = React.useState<number>(-1);

  const gotoList = () => {
    navigate('/company/list');
  };

  React.useEffect(() => {
    if (!isNaN(Number(params))) {
      setCompanyId(Number(params));
    } else {
      gotoList();
    }
  }, []);

  return (
    <>
      <CompanyBasic />
      <Divider />
      <PlanBlock isCompany />
      <Divider />
      <CompanyMemberInfo />
      <UnderBtn
        rightBtnZone={<DoubleButton onClick={gotoList}>목록으로</DoubleButton>}
      />
    </>
  );
};

export default Company;
