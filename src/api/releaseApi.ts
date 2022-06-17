import { CustomAPI, IResponseData } from '~/api/customAPI';
import { IPageInfo } from '~/model/common';
import { IMakeRelease } from '~/model/store';

export const ReleaseApi = {
  getReleaseList: async <T>() => {
    return await CustomAPI.post<T, IPageInfo>(
      '/v1/admin/link_release/get_list',
      {
        sort: [
          {
            col: 'link_ver_major',
            asc: false,
          },
          {
            col: 'link_ver_minor',
            asc: false,
          },
          {
            col: 'link_ver_micro',
            asc: false,
          },
        ],
        offset: 0,
        limit: 20,
      },
    );
  },
  setReleaseNotice: async <T>(create: IMakeRelease) => {
    return await CustomAPI.post<T, IMakeRelease>(
      '/v1/admin/link_release_notice/create',
      create,
    );
  },
};
