import { CustomAPI } from '~/redux/saga/customAPI';

export interface IStartEndDate {
  start_date: string;
  end_date: string;
}

export interface IDataProps {
  data: IStartEndDate;
}

export async function getDashboardCount(req: IStartEndDate): Promise<any> {
  return await CustomAPI.get(
    'dashboard/count',
    `start_date=${req.start_date}&end_date=${req.end_date}`,
  );
}

export async function getUserCount(
  req: Pick<IStartEndDate, 'end_date'>,
): Promise<any> {
  return await CustomAPI.get('user-group/count', `end_date=${req.end_date}`);
}

export async function getIdleCount(req: IStartEndDate): Promise<any> {
  return await CustomAPI.get(
    'user-group/count/idle',
    `start_date=${req.start_date}&end_date=${req.end_date}`,
  );
}

export interface IDownloadProps extends Partial<IStartEndDate> {
  path: string;
  where: 'dashboard' | 'user-group';
}

export async function downloadCSV(req: IDownloadProps): Promise<any> {
  let query = '';
  if (!req.start_date) {
    query = `end_date=${req.end_date}`;
  } else {
    query = `start_date=${req.start_date}&end_date=${req.end_date}`;
  }
  return await CustomAPI.download(`${req.where}/${req.path}`, query).then(
    res => res,
  );
}
