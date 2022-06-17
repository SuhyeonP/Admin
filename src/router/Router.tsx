import React from 'react';
import { Routes, Route } from 'react-router-dom';
import BaseLayout from '~/components/common/layout/BaseLayout';
import Login from '~/components/page/login/Login';
import ManageLayout from '~/components/common/layout/ManageLayout';
import Customer from '~/components/page/customer/Customer';
import Member from '~/components/page/member/Member';
import Alert from '~/components/page/alert/Alert';

const Router = (): JSX.Element => {
  return (
    <>
      <Routes>
        <Route path="/" element={<BaseLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ManageLayout />}>
            <Route index element={<Customer />} />
            <Route path="/alert" element={<Alert />} />
            <Route path="/detail/:customer" element={<Member />} />
          </Route>
        </Route>
        <Route path="/*" element={<>err</>} />
      </Routes>
    </>
  );
};

export default Router;
