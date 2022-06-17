import { IPageInfo, IPersonInfo, IStateWithSetState } from '~/model/common';
import { ICustomerId, LicenseState } from '~/model/store/customersStore';
import { MemberApi } from '~/api/memberApi';

export interface IMemberStore {
  customer_id: number;
}

export interface IMemberID {
  member_id: number;
}

export interface IResponseMember extends IPersonInfo, IMemberStore, IMemberID {
  department?: string;
  member_license_key: string;
  state: LicenseState;
  workspace: string;
}

export interface IMM {
  mm: number;
  mc: number;
}

export interface IRegisterSuccessInfo {
  first_name: string;
  last_name: string;
  member_license_key: string;
}

export interface IMemberCount {
  customerMM: IMM;
}

export type IMemberResponse = IMemberID & IPersonInfo;

export type IRequestMembers = IMemberStore & IPageInfo;

export class MemberClass {
  private static instance: MemberClass;

  private constructor() {
    //
  }

  public static getInstance(): MemberClass {
    if (!MemberClass.instance) {
      MemberClass.instance = new MemberClass();
    }
    return MemberClass.instance;
  }

  public getMembers<T>(req: IRequestMembers) {
    return MemberApi.getMembers<T>(req);
  }

  public editMember<T>(edit: IPersonInfo & IMemberID) {
    return MemberApi.editMember<T>(edit);
  }

  public deleteMember<T>(member_ids: number[]) {
    return MemberApi.deleteMembers<T>(member_ids);
  }

  public registerMember<T>(req: IPersonInfo & ICustomerId) {
    return MemberApi.registerMember<T>(req);
  }
}

export const memberStore = MemberClass.getInstance();
