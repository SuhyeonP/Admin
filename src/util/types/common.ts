import { Control } from 'react-hook-form';
import { IGetSelected } from '~/src/component/organisms/member/MembersOption';

export type RequiredString =
  | 'email'
  | 'password'
  | 'firstName'
  | 'lastName'
  | 'company'
  | 'phoneNumber'
  | 'releaseNote'
  | 'templateName'
  | 'title'
  | 'emailContent'
  | 'preHeader';

export type ErrorMsgType = Record<RequiredString, string>;

export type EmptyVoid = () => void;

export type MouseEventVoid = (e: MouseEvent) => void;

export type DataVoid = (data: undefined) => () => void;

export type EventVoid = EmptyVoid | MouseEventVoid | DataVoid;

export type DateRange =
  | 'entire'
  | 'today'
  | 'yesterday'
  | 'last7'
  | 'last30'
  | 'last90'
  | 'thisWeek'
  | 'thisMonth'
  | 'thisQuarter'
  | 'user';

export type DateRangePart =
  | 'lastAgreeMarketing'
  | 'memberCreated'
  | 'lastUsed'
  | 'companyCreated'
  | 'issueDate'
  | 'endDate';

export interface IJobsType {
  Data_Analyst: 'Data Analyst';
  Data_Scientist: 'Data Scientist';
  Data_Engineer: 'Data Engineer';
  DevOps_Engineer: 'DevOps Engineer';
  ML_Engineer: 'ML Engineer';
  MLOps_Engineer: 'MLOps Engineer';
  System_Engineer: 'System Engineer';
  'S/W_Engineer': 'S/W Engineer';
  Marketing_Manager: 'Marketing Manager';
  Product_Manager: 'Product Manager';
  Sales_Manager: 'Sales Manager';
  Student: 'Student';
  Etc: 'Etc';
}

export type Plan = 'entire' | 'community' | 'enterprise';

export type LicenseType = 'free';

export interface IDateRangeProps {
  selectDateRange: DateRangePart;
  period: string;
  pickDateRange: [Date, Date];
}

export interface ISearchProps {
  search: string;
  searchInput?: string;
}

export interface IRegisterForm {
  plan: Plan;
  license: LicenseType;
}

export interface IPlanInfo extends IRegisterForm {
  license_start: string;
  license_end: string;
}

export interface IRegisterCompany {
  name: string;
  phone_number: string;
}

export interface ICompanyBase extends IRegisterCompany {
  create_date: string;
  admin: number;
  member_count: number;
}

export interface IProductKeyProps {
  product_key: string;
  key_state: string;
  key_created_at: string;
  expiration_date: string;
}

export interface IMemberInfo {
  job_title: string;
  email: string;
  first_name: string;
  last_name: string;
  registered_at: string;
  last_used: string;
  last_agree: string;
  admin: string;
  state: string;
  company: string;
}

export interface IPlan {
  plan: string;
  license: string;
  start_date: string;
  end_date: string;
}

export interface IProductKeyInfo {
  product_key: string;
  status: string;
  create_date: string;
  end_date: string;
}

// Partial<IMemberInfo>

export interface IRegisterMemberInfo
  extends IRegisterForm,
    Partial<IMemberInfo> {
  belong: string;
  companyId?: number;
}

// todo check type clear
export type OnControl =
  | IGetSelected
  | (ISelectedProps & IDateRangeProps)
  | IRegisterMemberInfo
  | (Partial<IRegisterCompany> & IRegisterForm)
  | IMemberInfo
  | IPlanInfo
  | ICompanyBase
  | IPlan
  | IProductKeyInfo
  | IContainMember;

export interface ISelectedProps {
  control: Control<any, any>;
}

export type UseLink = 'used' | 'unused';

export type AgreeOrDisagree = 'agree' | 'disagree';

export interface IIsCustomer {
  ic?: 'true' | 'false';
}

export type TrueFalseString = 'true' | 'false';

export interface ISort {
  asc: boolean;
  col: string;
}

export interface IHead {
  id: string;
  label: string;
  width: string;
}

export interface ISimpleMember {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}

export type AddMemberType = 'origin' | 'new';

export interface IContainMember extends ISearchProps, Partial<IMemberInfo> {
  selectType: AddMemberType;
}

export interface IVersion {
  version: string;
}

export interface IDeployForm extends IVersion {
  release_note: any;
}

export interface IPropsWithAbleToSelect extends ISelectedProps {
  isDisable?: boolean;
}
