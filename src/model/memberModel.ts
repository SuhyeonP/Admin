import React from 'react';

import { IMemberStore, IMM, IResponseMember } from './store';
import { IStateWithSetState, memberInit, ReactSetState } from '~/model/common';

interface IRefecth {
  refetch: boolean;
  setRefetch: ReactSetState<boolean>;
}

export const MemberContext = React.createContext<
  IMemberStore & IStateWithSetState<IMM> & IRefecth
>({
  customer_id: 0,
  state: {
    mm: 0,
    mc: 0,
  },
  setState: data => {
    //
  },
  refetch: false,
  setRefetch: data => {
    //
  },
});

export const MemberSelectedContext = React.createContext<
  IStateWithSetState<IResponseMember[]>
>({
  state: [memberInit],
  setState: data => {
    //
  },
});
