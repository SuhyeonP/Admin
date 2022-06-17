import React from 'react';
import { IAuth, userStore } from '~/model/store';
import { IDataVoid, IVoid } from '~/model/common';

interface IAuthContext extends IAuth {
  settingAuth: IDataVoid<string>;
  logout: IVoid;
}

export const AuthContext = React.createContext<IAuthContext>({
  bearer_token: '',
  settingAuth: (data: string) => {
    userStore.bearer_token = data;
  },
  logout: userStore.logout,
});
