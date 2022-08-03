import { makeObservable, observable, action } from 'mobx';
import { Auth, User } from './UserStoreModels';
const accessToken = localStorage.getItem('accessToken') || '';
const refreshToken = localStorage.getItem('refreshToken') || '';

export class UserStoreImpl {
  auth: Auth = {};
  user: User = {};

  constructor (auth: Auth, user: User) {
    makeObservable(this, {
      auth: observable,
      user: observable,
      setAuth: action,
      setUser: action
    });
    this.auth = auth;
    this.user = user;
  }

  setAuth (authResponse: Auth) {
    this.auth = authResponse;
    localStorage.setItem('accessToken', authResponse.accessToken as string);
    localStorage.setItem('refreshToken', authResponse.refreshToken as string);
  }

  setUser (userResponse: User) {
    this.user = userResponse;
  }

  setTopArtists (artists: any) {
    this.user.topArtists = artists;
  }

  getAccessToken () {
    return this.auth.accessToken;
  }

  getRefreshToken () {
    return this.auth.refreshToken;
  }
}

export const UserStore = new UserStoreImpl({ accessToken, refreshToken }, {});
