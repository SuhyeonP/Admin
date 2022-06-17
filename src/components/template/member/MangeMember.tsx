import React from 'react';
import { useParams } from 'react-router-dom';
import { CustomerDetail } from '~/components/organism/member';
import { MemberContext } from '~/model';
import Members from '~/components/organism/member/Members';

const MangeMember = (): JSX.Element => {
  const [customer_id] = React.useState<number>(Number(useParams().customer));
  const [refetch, setRefetch] = React.useState(false);

  const [state, setState] = React.useState({
    mm: 0,
    mc: 0,
  });

  return (
    <MemberContext.Provider
      value={{ customer_id, state, setState, refetch, setRefetch }}
    >
      <CustomerDetail />
      <Members />
    </MemberContext.Provider>
  );
};
export default MangeMember;
