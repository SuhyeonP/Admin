import { CustomAPI, IResponseData } from '~/api/customAPI';
import { ISendToCustomer, ITestMail } from '~/model/store';

export const AlertApi = {
  sendTestMail: async <T>(content: ITestMail) => {
    return await CustomAPI.post<T, ITestMail>(
      '/v1/admin/notice/send_test',
      content,
    );
  },
  sendRealMail: async <T>(content: ISendToCustomer) => {
    return await CustomAPI.post<T, ISendToCustomer>(
      '/v1/admin/notice/send',
      content,
    );
  },
};
