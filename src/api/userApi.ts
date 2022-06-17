import { ILoginInput, userStore } from '~/model/store';
import { CustomAPI } from '~/api/customAPI';

export const userAPI = {
  login: async (info: ILoginInput) => {
    return await CustomAPI.login(info);
  },
  logout: async () => {
    await CustomAPI.post('/v1/admin/admin_user/logout', {
      bearer_token: userStore.bearer_token,
    });
  },
};
