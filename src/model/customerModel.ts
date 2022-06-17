import React from 'react';
import { IRefresh, ReactSetState } from '~/model/common';

interface ICustomerContext {
  refresh: IRefresh;
  setRefresh: ReactSetState<IRefresh>;
}

export const CustomerContext = React.createContext<ICustomerContext>({
  refresh: {
    make: false,
    type: '',
  },
  setRefresh: data => {
    //
  },
});
