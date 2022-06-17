import axios, { AxiosResponse } from 'axios';
import { IAuth, ILoginInput, userStore } from '~/model/store';

export interface IResponseData<T> {
  ok: boolean;
  err: {
    code: string;
    where: unknown;
  };
  result: T;
}

const baseURL =
  process.env.NODE_ENV === 'production' ? process.env.SERVER_API : '';

function getToken(): string {
  return `Bearer ${userStore.token}`;
}

function filteringData<T>(
  res: AxiosResponse<IResponseData<T>>,
): IResponseData<T> {
  const { ok, err, result } = res.data;
  if (ok) {
    return { ok, result: result, err };
  } else {
    return {
      ok,
      result,
      err: {
        code: err.code,
        where: err.code,
      },
    };
  }
}

export const CustomAPI = {
  login: async (loginData: ILoginInput) => {
    const response: AxiosResponse<IResponseData<IAuth>> = await axios.post(
      '/v1/admin/admin_user/authenticate',
      JSON.stringify(loginData),
      {
        baseURL,
        headers: {
          'Content-type': 'application/json',
        },
      },
    );

    if (response.status === 200) {
      const { ok } = response.data;

      if (ok) {
        return { ok, result: response.data.result };
      } else {
        return {
          ok,
          err: {
            code: response.data.err?.code,
            where: response.data.err?.code,
          },
        };
      }
    }
  },
  post: async <T, R>(url: string, body?: R) => {
    const res: AxiosResponse<IResponseData<T>> = await axios.post(
      url,
      JSON.stringify(body),
      {
        baseURL,
        headers: {
          'Content-type': 'application/json',
          Authorization: getToken(),
        },
      },
    );
    return filteringData(res);
  },
};
