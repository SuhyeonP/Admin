export const getDoubleLength = (date: number) => {
  const temp = date.toString();

  return temp.length === 2 ? temp : '0' + temp;
};

export const makeDateForm = (date: string) => {
  const temp: Date = new Date(date + 'Z');
  const day = temp.getDate();
  const month = temp.getMonth() + 1;
  const year = temp.getFullYear();
  const hour = temp.getHours();
  const minute = temp.getMinutes();

  return `${year}.${getDoubleLength(month)}.${getDoubleLength(
    day,
  )}   ${getDoubleLength(hour)}:${getDoubleLength(minute)}`;
};

export const makeSimpleDate = (date: string | Date) => {
  const temp: Date = new Date(date);

  const day = temp.getDate();
  const month = temp.getMonth() + 1;
  const year = temp.getFullYear();

  return `${year}-${getDoubleLength(month)}-${getDoubleLength(day)}`;
};
