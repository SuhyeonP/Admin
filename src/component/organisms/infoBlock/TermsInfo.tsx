import React from 'react';
import { TermsTable } from '~/src/component/organisms/table';
import { TitleWithEditWrapper } from '~/src/component/molecules/wrapper';

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
