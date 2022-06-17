import React from 'react';
import { Helmet } from 'react-helmet-async';
import { MangeMember } from '~/components/template/member';

const Member = (): JSX.Element => {
  return (
    <>
      <Helmet>
        <title>Member Detail</title>
      </Helmet>
      <MangeMember />
    </>
  );
};

export default Member;
