import { CustomAPI } from '~/api/customAPI';
import { IPersonInfo } from '~/model/common';
import {
  IMemberID,
  IMemberStore,
  IRequestMembers,
} from '~/model/store/memberStore';
import { ICustomerId } from '~/model/store';

export const MemberApi = {
  getMembers: async <T>(req: IRequestMembers) => {
    return await CustomAPI.post<T, IRequestMembers>(
      '/v1/admin/member/get_list',
      req,
    );
  },
  editMember: async <T>(memberInfo: IPersonInfo & IMemberID) => {
    return await CustomAPI.post<T, IPersonInfo & IMemberID>(
      '/v1/admin/member/edit',
      memberInfo,
    );
  },
  deleteMembers: async <T>(member_ids: number[]) => {
    return await CustomAPI.post<T, Record<'member_ids', number[]>>(
      '/v1/admin/member/delete',
      {
        member_ids,
      },
    );
  },
  registerMember: async <T>(register: IPersonInfo & ICustomerId) => {
    return await CustomAPI.post<T, IPersonInfo & ICustomerId>(
      '/v1/admin/member/register',
      register,
    );
  },
};
