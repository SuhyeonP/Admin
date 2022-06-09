import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CompanyMemberInfo from '../../organisms/infoBlock/CompanyMemberInfo';
import { Divider } from '~/src/component/atoms';
import { CompanyBasic, PlanBlock } from '~/src/component/organisms/infoBlock';

const Company = (): JSX.Element => {
  const params = useParams().detail;
  const navigate = useNavigate();

  const [companyId, setCompanyId] = React.useState<number>(-1);

  React.useEffect(() => {
    if (!isNaN(Number(params))) {
      setCompanyId(Number(params));
    } else {
      navigate('/company/list');
    }
  }, []);

  return (
    <>
      <CompanyBasic />
      <Divider />
      <PlanBlock />
      <Divider />
      <CompanyMemberInfo />
    </>
  );
};

export default Company;
