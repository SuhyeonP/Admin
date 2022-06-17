import { userAPI } from '~/api/userApi';

export interface ILoginInput {
  email: string;
  password: string;
}

export interface IAuth {
  bearer_token: string;
}

export interface IUser extends IAuth {
  isAuthorized: boolean;
}

export class UserStore implements IUser {
  bearer_token: string;
  isAuthorized: boolean;

  private static _instance: UserStore | null = null;

  public static getInstance(): UserStore {
    if (this._instance) {
      return this._instance;
    }
    return new UserStore();
  }

  private constructor() {
    this.bearer_token = localStorage.getItem('authorization') as string;
    this.isAuthorized = this.bearer_token !== '';
  }

  get token() {
    return localStorage.getItem('authorization') || '';
  }

  public setToken(value: string) {
    localStorage.setItem('authorization', value);
    this.bearer_token = value;
    this.isAuthorized = true;
  }

  private removeToken() {
    this.isAuthorized = false;
    this.bearer_token = '';
    localStorage.removeItem('authorization');
  }

  public login<T>(info: ILoginInput) {
    const result = userAPI.login(info);
    return result as unknown as T;
  }

  public async logout() {
    this.removeToken();
    await userAPI.logout();
  }
}

export const userStore = UserStore.getInstance();
