import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ManageCustomers } from '~/components/template/customer';

const Customer = (): JSX.Element => {
  return (
    <>
      <Helmet>
        <title>Customers list</title>
      </Helmet>
      <ManageCustomers />
    </>
  );
};

export default Customer;
