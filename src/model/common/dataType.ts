import { licenseObject } from '~/model/store/customersStore';
import { ReactSetState } from '~/model/common/componentType';

export type Direction = 'Horizontal' | 'Vertical';

export interface IFormInputError {
  isError: boolean;
  msg: string;
}

export interface ISortInfo {
  col: string;
  asc: boolean;
}

export interface IPageInfo {
  offset: number;
  limit: number;
  sort: ISortInfo[];
}

export interface IQueryRequestData {
  lt?: string;
  lte?: string;
  gt?: string;
  gte?: string;
  eq?: string;
  neq?: string;
  in_?: string[];
  like?: string;
  notlike?: string;
}

export interface IPersonInfo {
  last_name: string;
  first_name: string;
  job_title: string;
  email: string;
  phone_number?: string;
}

export interface IListDataResponse<T> {
  items: T[];
  total_count: number;
}

export interface IClassType {
  id: keyof typeof licenseObject;
  label: string;
  isGroup: boolean;
}

export interface IRefresh {
  make: boolean;
  type?: string;
}

export interface IStateWithSetState<T> {
  state: T;
  setState: ReactSetState<T>;
}
