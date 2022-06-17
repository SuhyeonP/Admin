import { IClassType } from '~/model/common/dataType';

export const jobs = [
  'Data Scientist',
  'DevOps Engineer',
  'System Engineer',
  'Product Manager',
  'Student',
  'Etc',
];

export const licenseType: IClassType[] = [
  {
    id: 'Open_Network',
    label: '유료',
    isGroup: true,
  },
  {
    id: 'Closed_Network',
    label: '유료 단체 (team)',
    isGroup: true,
  },
  {
    id: 'Community',
    label: '무료 (trial)',
    isGroup: false,
  },
  {
    id: 'Premium_Trial',
    label: '유료 체험 (personal)',
    isGroup: false,
  },
  {
    id: 'Premium',
    label: '개인 유료 (premium)',
    isGroup: false,
  },
];

export const memberRow = [
  {
    id: 'group',
    label: '워크스페이스',
  },
  {
    id: 'name',
    label: '이름',
  },
  {
    id: 'email',
    label: '이메일',
  },
  {
    id: 'pn',
    label: '전화번호',
  },

  {
    id: 'job',
    label: '직무',
  },
  {
    id: 'licenseKey',
    label: '라이센스 Key',
  },
  // {
  //   id: 'version',
  //   label: '버전',
  // },
];

export const today = new Date();
export const thisYear = today.getFullYear();
export const thisMonth = today.getMonth();

export const periodList: Record<string, Date[]> = {
  lastYear: [new Date(thisYear - 1, 0, 1), new Date(thisYear - 1, 11, 31)],
  lastMonth: [
    new Date(thisYear, thisMonth - 1, 1),
    new Date(thisYear, thisMonth, 0),
  ],
  thisMonth: [
    new Date(thisYear, thisMonth, 1),
    new Date(thisYear, thisMonth + 1, 0),
  ],
  thisYear: [new Date(thisYear, 0, 1), new Date(thisYear, 11, 31)],
};
