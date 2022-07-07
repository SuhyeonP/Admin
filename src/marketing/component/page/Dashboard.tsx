import React from 'react';
import styled from '@emotion/styled';
import DashboardDateRange from 'marketing/component/organisms/dashboard/DashboardDateRange';
import PageInfo from 'marketing/component/molecules/PageInfo';
import DashboardBlocks from 'marketing/component/organisms/dashboard/DashboardBlocks';
import { useDashboardLocal } from 'marketing/hook/useLocal';

const DashboardStyled = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
`;

const Dashboard = (): JSX.Element => {
  const [local, setting] = useDashboardLocal();

  return (
    <DashboardStyled>
      <PageInfo type="dashboard" />
      <DashboardDateRange local={local} setting={setting} />
      <React.Suspense fallback={<></>}>
        <DashboardBlocks local={local} />
      </React.Suspense>
    </DashboardStyled>
  );
};

export default Dashboard;
