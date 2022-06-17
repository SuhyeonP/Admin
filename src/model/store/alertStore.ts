import { ICustomerIds } from '~/model/store/customersStore';
import { AlertApi } from '~/api/alertApi';
import { IReleaseList } from '~/model/store/versionStore';

export type MailTemplate = 'member_license' | 'notice' | 'help_center_ask';

export interface ISendMailForm {
  title: string;
  content: string;
  template?: MailTemplate;
}

export type ISendToCustomer = ISendMailForm & ICustomerIds;

export interface ITestMail extends ISendMailForm {
  email: string;
}

export interface ISelectedNotice {
  selectedCustomer: ISelectedCustomer[];
}

export interface ISelectedCustomer {
  member_count: number;
  customer_id: number;
}

export type SelectedTargetType = 'Release' | 'Email';

export class AlertStore implements ISelectedNotice {
  private static instance: AlertStore;
  public selectedCustomer: ISelectedCustomer[] = [];

  private constructor() {
    //
  }

  public static getInstance(): AlertStore {
    if (!AlertStore.instance) {
      AlertStore.instance = new AlertStore();
    }
    return AlertStore.instance;
  }

  public sendTestMail<T>(send: ISendMailForm) {
    const temp = {
      ...send,
      email: 'suhyeon.park@makinarocks.ai',
    };

    return AlertApi.sendTestMail<T>(temp as ITestMail);
  }

  public sendRealMail<T>(send: ISendToCustomer) {
    return AlertApi.sendRealMail<T>(send);
  }
}

export const alertStore = AlertStore.getInstance();
