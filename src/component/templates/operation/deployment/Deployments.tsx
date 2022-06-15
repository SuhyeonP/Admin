import React from 'react';
import { SubTitle } from '~/src/component/atoms';
import { DeployVersion, VersionTable } from '~/src/component/organisms/version';

const Deployments = (): JSX.Element => {
  return (
    <>
      <SubTitle>배포 목록</SubTitle>
      <DeployVersion />
      <VersionTable />
    </>
  );
};

export default Deployments;
