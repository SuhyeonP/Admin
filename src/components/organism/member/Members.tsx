import React from 'react';
import { ControlMembers } from '~/components/organism/member';
import MemberTable from '~/components/organism/member/MemberTable';
import { IResponseMember } from '~/model/store';
import { MemberSelectedContext } from '~/model/memberModel';

const Members = (): JSX.Element => {
  const [selected, setSelected] = React.useState<IResponseMember[]>([]);

  return (
    <MemberSelectedContext.Provider
      value={{
        state: selected,
        setState: setSelected,
      }}
    >
      <ControlMembers />
      <MemberTable />
    </MemberSelectedContext.Provider>
  );
};

export default Members;
