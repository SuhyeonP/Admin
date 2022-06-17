export type IVoid = () => void;
export type IDataVoid<T> = (data: T) => void;

export const makeDateForm = (date: Date | string) => {
  const temp: Date = new Date(date);
  const day = temp.getDate();
  const month = temp.getMonth() + 1;
  const year = temp.getFullYear();
  return `${year}. ${month}. ${day}`;
};
