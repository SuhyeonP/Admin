import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { userStore } from '~/model/store';
import { AuthContext } from '~/model/userModel';
import GlobalLayout from '~/components/common/layout/globalLayout';

const BaseLayout = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.slice(1);

  const [bearer_token, setBt] = React.useState(userStore.bearer_token);

  // todo check userstore 에 effect 걸어서 로그아웃 대신 하는거
  React.useEffect(() => {
    if (bearer_token === '' || !bearer_token) {
      navigate('/login', { replace: true });
    } else {
      if (path === 'login') {
        navigate('/', { replace: true });
      }
    }
  }, [bearer_token]);

  const settingAuth = React.useCallback((value: string) => {
    setBt(value);
    userStore.setToken(value);
  }, []);

  const logout = React.useCallback(async () => {
    setBt('');
    await userStore.logout();
  }, []);

  return (
    <GlobalLayout>
      <AuthContext.Provider
        value={{
          bearer_token,
          settingAuth,
          logout,
        }}
      >
        <Outlet />
      </AuthContext.Provider>
    </GlobalLayout>
  );
};

export default BaseLayout;
