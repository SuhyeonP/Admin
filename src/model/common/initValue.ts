import { IPersonInfo } from '~/model/common/dataType';
import {
  ICustomer,
  IMemberID,
  IRegisterSuccessInfo,
  IResponseCustomer,
  IResponseMember,
} from '~/model/store';

export const initialError = {
  email: {
    isError: false,
    msg: '',
  },
  last_name: {
    isError: false,
    msg: '',
  },
  first_name: {
    isError: false,
    msg: '',
  },
  job_title: {
    isError: false,
    msg: '',
  },
  phone_number: {
    isError: false,
    msg: '',
  },
  company: {
    isError: false,
    msg: '',
  },
  member_max: {
    isError: false,
    msg: '',
  },
};

export const personInit: IPersonInfo = {
  last_name: '',
  first_name: '',
  job_title: 'Data Scientist',
  email: '',
  phone_number: '',
};

export const memberInit: IResponseMember = {
  member_id: 0,
  last_name: '',
  first_name: '',
  job_title: 'Data Scientist',
  email: '',
  phone_number: '',
  department: '',
  member_license_key: '',
  customer_id: 0,
  workspace: '',
  state: 'InValid',
};

export const registerMemberInfo: IRegisterSuccessInfo = {
  first_name: '',
  last_name: '',
  member_license_key: '',
};

export const customerInit: ICustomer = {
  first_name: '',
  last_name: '',
  email: '',
  job_title: 'Data Scientist',
  license_class: 'Community',
  company: '',
  customer_type: 'Personal',
  member_max: 1,
};

export const responseCustomerInit: IResponseCustomer = {
  first_name: '',
  last_name: '',
  email: '',
  job_title: 'Data Scientist',
  license_class: 'Community',
  company: '',
  customer_type: 'Personal',
  member_max: 1,
  issue_date: '',
  expiration_date: '',
  customer_id: 0,
  customer_license_state: 'InValid',
  member_count: 0,
};

// export class InitPersonError
//   implements Record<keyof IPersonInfo, IFormInputError>
// {
//   first_name: IFormInputError = {
//     isError: false,
//     msg: '',
//   };
//   last_name: IFormInputError = {
//     isError: false,
//     msg: '',
//   };
//   email: IFormInputError = {
//     isError: false,
//     msg: '',
//   };
//   job_title: IFormInputError = {
//     isError: false,
//     msg: '',
//   };
//   phone_number: IFormInputError = {
//     isError: false,
//     msg: '',
//   };
//
//   constructor() {
//     //
//   }
//
//   public getInitialError() {
//     return initialError;
//   }
// }
