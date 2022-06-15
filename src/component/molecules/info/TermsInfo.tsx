import React from 'react';
import { TitleWithEditWrapper } from '~/src/component/molecules/wrapper';
import { TermsTable } from '~/src/component/organisms/member';

const TermsInfo = (): JSX.Element => {
  return (
    <>
      <TitleWithEditWrapper title="약관" notUsedStyle>
        <TermsTable />
      </TitleWithEditWrapper>
    </>
  );
};

export default TermsInfo;
