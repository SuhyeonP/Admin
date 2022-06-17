import {
  ICustomer,
  ICustomerIds,
  IRequestCustomers,
  IWriteCustomer,
} from '~/model/store/customersStore';
import { CustomAPI } from '~/api/customAPI';

export const customerApi = {
  getCustomers: async <T>(data: IRequestCustomers) => {
    return await CustomAPI.post<T, IRequestCustomers>(
      '/v1/admin/customer/list_customers_full',
      data,
    );
  },
  getCustomer: async <T>(customer_id: number) => {
    return await CustomAPI.post<any, Record<'customer_id', number>>(
      '/v1/admin/customer/get',
      { customer_id },
    );
  },
  registerCustomer: async <T>(registerData: ICustomer) => {
    return await CustomAPI.post<Record<'customer_id', number>, ICustomer>(
      '/v1/admin/customer/register',
      registerData,
    );
  },
  editCustomer: async <T>(edit: IWriteCustomer) => {
    return await CustomAPI.post<T, IWriteCustomer>(
      '/v1/admin/customer/edit',
      edit,
    );
  },
  deleteCustomers: async <T>(customer_ids: number[]) => {
    return await CustomAPI.post<T, ICustomerIds>('/v1/admin/customer/delete', {
      customer_ids,
    });
  },
};
