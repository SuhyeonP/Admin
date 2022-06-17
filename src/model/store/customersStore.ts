import {
  IDataVoid,
  IPageInfo,
  IPersonInfo,
  IQueryRequestData,
} from '~/model/common';
import { customerApi } from '~/api/customerApi';

export type LicenseState = 'Valid' | 'InValid' | 'Expired';
export type CustomerType = 'Personal' | 'Enterprise';

export const licenseObject = {
  // IndividualTrial: 'IndividualTrial',
  // Individual: 'Individual',
  // GroupTrial: 'GroupTrial',
  // GroupTeam: 'GroupTeam',
  // GroupEnterprise: 'GroupEnterprise',
  Community: 'Community',
  Premium_Trial: 'Premium_Trial',
  Premium: 'Premium',
  Open_Network: 'Open_Network',
  Closed_Network: 'Closed_Network',
};

export interface ICustomerIds {
  customer_ids: number[];
}

export type OrderData =
  | 'customer_type'
  | 'first_name'
  | 'email'
  | 'company'
  | 'license_class'
  | 'issue_date'
  | 'expiration_date'
  | 'customer_license_state'
  | 'member_max'
  | 'customer_id';

export interface ICustomersCondition {
  customer_type?: IQueryRequestData;
  license_class?: IQueryRequestData;
  customer_license_state?: IQueryRequestData;
}

export interface ICustomerId {
  customer_id: number;
}

export interface ICustomer extends IPersonInfo {
  company: string;
  customer_type: CustomerType;
  license_class: keyof typeof licenseObject;
  member_max: number;
}

export interface IWriteCustomer extends ICustomer {
  customer_id: number;
}

export interface IRequestCustomers extends IPageInfo {
  where: ICustomersCondition;
}

export interface IUserActionListRequest extends IPageInfo {
  total: boolean;
  customer_type?: CustomerType;
  customer_license_state?: LicenseState;
  license_class?: keyof typeof licenseObject;
  date_range?: Date[];
  search?: string;
}

export interface IResponseCustomer extends IWriteCustomer {
  customer_license_state: LicenseState;
  expiration_date: string;
  issue_date: string;
  member_count: number;
}

export interface ICustomerDataProps {
  settingCustomersDetail: IDataVoid<IUserActionListRequest>;
  sorting: IUserActionListRequest;
}

export class CustomersStore {
  private static instance: CustomersStore;

  private constructor() {
    //
  }

  public static getInstance(): CustomersStore {
    if (!CustomersStore.instance) {
      CustomersStore.instance = new CustomersStore();
    }
    return CustomersStore.instance;
  }

  public getCustomerList<T>(requestData: IUserActionListRequest) {
    const {
      total,
      customer_type,
      customer_license_state,
      license_class,
      search,
      date_range,
      offset,
      limit,
      sort,
    } = requestData;
    const sending: Record<string, any> = {
      sort,
      offset: offset * limit,
      limit,
    };
    const temp: Record<string, any> = {};

    if (date_range && date_range.length === 2) {
      const [start, end] = date_range;
      const from = new Date(
        start.getFullYear(),
        start.getMonth(),
        start.getDate(),
        0,
        0,
      );
      const to = new Date(
        end.getFullYear(),
        end.getMonth(),
        end.getDate(),
        23,
        59,
        59,
      );

      temp['issue_date'] = {
        lte: to.toISOString(),
      };
      temp['expiration_date'] = {
        gte: from.toISOString(),
      };
    }

    if (!total) {
      if (customer_type) {
        temp['customer_type'] = {
          eq: customer_type,
        };
      }
      if (customer_license_state) {
        temp['customer_license_state'] = {
          eq: customer_license_state,
        };
      }
      if (license_class) {
        temp['license_class'] = license_class.includes('Trial')
          ? {
              like: '%Trial',
            }
          : {
              notlike: '%Trial',
            };
      }
    }
    sending['where'] = temp;

    if (search) {
      sending['where']['first_name'] = {
        in: search,
      };
      sending['where']['last_name'] = {
        in: search,
      };
      sending['where']['company'] = {
        in: search,
      };
      sending['where']['email'] = {
        in: search,
      };
    }
    return customerApi.getCustomers<T>(sending as IRequestCustomers);
  }

  public getCustomer<T>(customer_id: number) {
    return customerApi.getCustomer<T>(customer_id);
  }

  public registerCustomer<T>(register: ICustomer) {
    return customerApi.registerCustomer<T>(register);
  }

  public editCustomer<T>(edit: IWriteCustomer) {
    return customerApi.editCustomer<T>(edit);
  }

  public removeCustomers<T>(ids: number[]) {
    return customerApi.deleteCustomers<T>(ids);
  }
  public simpleCustomers<T>(pageInfo: IPageInfo) {
    const temp: IRequestCustomers = {
      where: {},
      ...pageInfo,
    };
    return customerApi.getCustomers<T>(temp);
  }
}

export const customerStore = CustomersStore.getInstance();

// todo check store of reigster on dialog
