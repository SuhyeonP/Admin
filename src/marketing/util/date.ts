import { checkProd } from '~/util';

export type DateRange =
  | 'entire'
  | 'today'
  | 'yesterday'
  | 'last7'
  | 'last14'
  | 'last30'
  | 'last90'
  | 'thisWeek'
  | 'thisMonth'
  | 'thisQuarter'
  | 'last6m'
  | 'last1y';
const now = new Date();
const month = now.getMonth();
const year = now.getFullYear();
const date = now.getDate();

export const defaultDate = checkProd
  ? new Date(2022, 3, 27, 0, 0, 0)
  : new Date(2022, 3, 21, 0, 0, 0);

function getMonday(d: string | Date) {
  const temp: Date = new Date(d);
  const day = temp.getDay();
  const sunday = new Date(
    temp.setDate(temp.getDate() - day + (day === 0 ? -6 : 1)),
  );
  sunday.setHours(0);
  sunday.setMinutes(0);
  sunday.setSeconds(0);
  return sunday;
}

const thisQuarter = (m: number) => {
  let thisQuarterMonth = 0;

  switch (m) {
    case 0:
    case 1:
    case 2:
      thisQuarterMonth = 0;
      break;
    case 3:
    case 4:
    case 5:
      thisQuarterMonth = 3;
      break;
    case 6:
    case 7:
    case 8:
      thisQuarterMonth = 6;
      break;
    case 9:
    case 10:
    case 11:
    default:
      thisQuarterMonth = 9;
      break;
  }

  return new Date(year, thisQuarterMonth, 1, 0, 0);
};

export type IndicateDates =
  | 'last14'
  | 'last90'
  | 'last6m'
  | 'last1y'
  | 'last30'
  | 'last7';

export const selectDays: Record<IndicateDates, string> = {
  last7: '7일',
  last14: '14일',
  last30: '30일',
  last90: '90일',
  last6m: '6개월',
  last1y: '1년',
};

export const dateRange: Record<DateRange, [Date, Date]> = {
  today: [new Date(year, month, date), new Date(year, month, date)],
  yesterday: [new Date(year, month, date - 1), new Date(year, month, date - 1)],
  last7: [new Date(year, month, date - 7), new Date(year, month, date - 1)],
  last14: [new Date(year, month, date - 14), new Date(year, month, date - 1)],
  last30: [new Date(year, month, date - 30), new Date(year, month, date - 1)],
  last90: [new Date(year, month, date - 90), new Date(year, month, date - 1)],
  thisWeek: [getMonday(new Date()), new Date(year, month, date)],
  thisMonth: [new Date(year, month, 1), new Date(year, month, date)],
  thisQuarter: [thisQuarter(month), new Date(year, month, date)],
  entire: [defaultDate, new Date(year, month, date, 23, 59)],
  last6m: [new Date(year, month - 6, date), new Date(year, month, date - 1)],
  last1y: [new Date(year - 1, month, date), new Date(year, month, date - 1)],
};

export interface IDateArray {
  label: string;
  value: DateRange;
}

export const date_preset: Record<string, IDateArray[]> = {
  date_range: [
    { label: '전체 기간', value: 'entire' },
    { label: '오늘', value: 'today' },
    { label: '어제', value: 'yesterday' },
    { label: '지난 7일', value: 'last7' },
    { label: '지난 30일', value: 'last30' },
    { label: '지난 90일', value: 'last90' },
    { label: '이번 주(오늘까지)', value: 'thisWeek' },
    { label: '이번 달(오늘까지)', value: 'thisMonth' },
    { label: '이번 분기(오늘까지)', value: 'thisQuarter' },
  ],
};

export function makeDateTimeInfo(inputDate: string | Date) {
  const copy = new Date(inputDate);
  const [year, month, date, time] = new Intl.DateTimeFormat('ko', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
    .format(copy)
    .split('. ');

  return `${year}-${month}-${date} ${time}`;
}