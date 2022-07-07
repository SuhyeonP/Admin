export interface ICountDate {
  amount: number;
  percent: number;
}

export interface INormalCount {
  normal: ICountDate;
}

export interface IUniqueCount {
  unique: ICountDate;
}

export type NormalUnique = INormalCount & IUniqueCount;

export interface IDashboardBlock {
  activated_user: NormalUnique;
  license_subscriber: INormalCount;
  download: INormalCount;
  certified_user: NormalUnique;
  updated_user: NormalUnique;
}

export interface IUserGroupBlock {
  uncertified_user: number;
  certified_unused_user: number;
}

export interface IIdleUser {
  idle_user: number;
}
