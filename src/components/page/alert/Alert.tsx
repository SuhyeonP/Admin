import React from 'react';
import { Helmet } from 'react-helmet-async';
import AlertManager from '../../template/alert/AlertManager';

const Alert = (): JSX.Element => {
  return (
    <>
      <Helmet>
        <title>릴리즈, 메일 발송</title>
      </Helmet>
      <AlertManager />
    </>
  );
};

export default Alert;
