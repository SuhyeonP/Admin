import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import CheckAuth from './CheckAuth';
import {
  EditTemplate,
  Companies,
  Company,
  EmailTemplateList,
  Login,
  Member,
  Members,
  Deployments,
  Deployment,
  Error,
  SendNewEmail,
  SentEmailDetail,
} from '../component/pages';
import EmailList from '../component/pages/operation/email/EmailList';
import BaseLayout from '../component/organisms/layout/BaseLayout';

const Router = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<CheckAuth />}>
        <Route path="member" element={<BaseLayout />}>
          <Route index element={<Error />} />
          <Route path="list" element={<Members />} />
          <Route path="detail=:detail" element={<Member />} />
        </Route>
        <Route path="company" element={<BaseLayout />}>
          <Route index element={<Error />} />
          <Route path="list" element={<Companies />} />
          <Route path="detail=:detail" element={<Company />} />
        </Route>
        <Route path="operation" element={<BaseLayout />}>
          <Route index element={<Error />} />
          <Route path="email-template" element={<Outlet />}>
            <Route index element={<Error />} />
            <Route path="list" element={<EmailTemplateList />} />
            <Route path="edit=:templateId" element={<EditTemplate />} />
          </Route>
          <Route path="send-email" element={<Outlet />}>
            <Route index element={<Error />} />
            <Route path="list" element={<EmailList />} />
            <Route path="create" element={<SendNewEmail />} />
            <Route path="detail=:sentMailId" element={<SentEmailDetail />} />
          </Route>
          <Route path="deployment" element={<Outlet />}>
            <Route index element={<Error />} />
            <Route path="list" element={<Deployments />} />
            <Route path="detail=:detail" element={<Deployment />} />
          </Route>
        </Route>
        <Route path="admin" element={<BaseLayout />}>
          <Route index element={<Error />} />
          <Route path="admin-setting" element={<>admin</>} />
        </Route>
      </Route>
      <Route path="login" element={<CheckAuth />}>
        <Route index element={<Login />} />
      </Route>
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default Router;
