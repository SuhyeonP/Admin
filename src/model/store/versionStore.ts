import { ReleaseApi } from '~/api/releaseApi';

export interface IVersion {
  link_ver: string;
  link_ver_name?: string;
  link_ver_major: number;
  link_ver_minor: number;
  link_ver_micro: number;
  state?: ReleaseState;
}

export interface ILinkVersion extends IVersion {
  id?: number;
}

export type ReleaseState =
  | 'NotAnnounced'
  | 'Announced'
  | 'Deprecated'
  | 'Invalid';

export interface IReleaseList extends ILinkVersion {
  commit_id: string;
  description: string;
  release_note: string;
  release_date: string;
}

export interface ICreateNotice {
  notice: string;
  registered_at: string;
  link_release_id: number;
}

export interface IReleaseListResponse {
  link_releases: IReleaseList[];
}

export type IMakeRelease = ICreateNotice & ILinkVersion;
export class VersionStore {
  private static instance: VersionStore;

  private constructor() {
    //
  }

  public static getInstance(): VersionStore {
    if (!VersionStore.instance) {
      VersionStore.instance = new VersionStore();
    }

    return VersionStore.instance;
  }

  public getReleaseList<T>() {
    return ReleaseApi.getReleaseList<T>();
  }

  public setReleaseNotice<T>(create: IMakeRelease) {
    return ReleaseApi.setReleaseNotice<T>(create);
  }
}

export const versionStore = VersionStore.getInstance();
