import { AxiosError } from 'axios';

interface IError {
  msg: string;
  tokenInValid?: boolean;
  where?: string;
}
export const checkErr = (err: AxiosError): IError => {
  const status = err.response!.status;

  if (status === 500) {
    return { msg: 'Server Error' };
  } else if (status === 401) {
    return { msg: 'Invalid token', tokenInValid: true };
  } else if (status === 422) {
    const where = err.response!.data.detail[0].loc[1];
    console.log(where);
    return { msg: '잘못 입력하였습니다.', where };
  } else {
    return { msg: 'User Error' };
  }
};
