import { DateRange } from '~/src/util/types';

const now = new Date();
const month = now.getMonth();
const year = now.getFullYear();
const date = now.getDate();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getMonday(d: string | Date) {
  const temp: Date = new Date(d);
  const day = temp.getDay();

  const monday = new Date(
    temp.setDate(temp.getDate() - day + (day == 0 ? -6 : 1)),
  );

  monday.setHours(0);
  monday.setMinutes(0);
  monday.setSeconds(0);

  return monday;
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

export const dateRange: Record<DateRange, [Date, Date]> = {
  today: [
    new Date(year, month, date, 0, 0),
    new Date(year, month, date, 23, 59),
  ],
  yesterday: [
    new Date(year, month, date - 1, 0, 0),
    new Date(year, month, date - 1, 23, 59),
  ],
  last7: [
    new Date(year, month, date - 7, 0, 0),
    new Date(year, month, date - 1, 0, 0),
  ],
  last30: [
    new Date(year, month, date - 30, 0, 0),
    new Date(year, month, date - 1, 0, 0),
  ],
  last90: [
    new Date(year, month, date - 90, 0, 0),
    new Date(year, month, date - 1, 0, 0),
  ],
  thisWeek: [getMonday(new Date()), new Date(year, month, date)],
  thisMonth: [new Date(year, month, 1, 0, 0), new Date(year, month, date)],
  thisQuarter: [thisQuarter(month), new Date(year, month, date)],
  user: [
    new Date(year, month, date, 0, 0),
    new Date(year, month, date, 23, 59),
  ],
  entire: [
    new Date(year, month, date, 0, 0),
    new Date(year, month, date, 23, 59),
  ],
};

export const selectType = {
  plan: [
    { label: 'Community', value: 'community' },
    { label: 'Enterprise', value: 'enterprise' },
  ],
  productUse: [
    { label: '??????', value: 'used' },
    { label: '?????????', value: 'unused' },
  ],
  agreeMarketing: [
    { label: '??????', value: 'agree' },
    { label: '?????????', value: 'disagree' },
  ],
  searchMember: [
    { label: '?????????', value: 'email' },
    { label: '??????', value: 'fullName' },
  ],
  date_range: [
    { label: '?????? ??????', value: 'entire' },
    { label: '??????', value: 'entire' },
    { label: '??????', value: 'entire' },
    { label: '?????? 7???', value: 'entire' },
    { label: '?????? 30???', value: 'entire' },
    { label: '?????? 90???', value: 'entire' },
    { label: '?????? ???(????????????)', value: 'entire' },
    { label: '?????? ???(????????????)', value: 'entire' },
    { label: '?????? ??????(????????????)', value: 'entire' },
    { label: '????????? ??????', value: 'get-function' },
  ],
};
