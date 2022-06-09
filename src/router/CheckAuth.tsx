import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const CheckAuth = (): JSX.Element => {
  const navigate = useNavigate();
  const path = useLocation().pathname.slice(1);

  React.useEffect(() => {
    if (path === '') {
      navigate('/member/list');
    }
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
};

export default CheckAuth;
