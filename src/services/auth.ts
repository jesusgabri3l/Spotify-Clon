import axios, { AxiosResponse } from 'axios';
import generateRandomString from 'generate-random-string';
import querystring from 'query-string';
import { TokenBody, RefreshTokenBody } from './AuthModels';
import { UserStore } from '../store/UserStore';

const AuthURL: string = import.meta.env.VITE_AUTH_SPOTIFY_URI;

const clientID: string = import.meta.env.VITE_CLIENT_ID;
const clientSecret: string = import.meta.env.VITE_CLIENT_SECRET;
const scope: string = 'user-read-private user-read-email user-library-read user-top-read user-follow-read user-follow-modify';
const redirectURI: string = import.meta.env.VITE_REDIRECT_URI;
const state: string = generateRandomString('16', true);

function getHeaders () {
  return {
    Authorization: 'Basic ' + btoa(clientID + ':' + clientSecret),
    'Content-Type': 'application/x-www-form-urlencoded'
  };
}

export const api = axios.create({
  baseURL: AuthURL
});

api.interceptors.response.use(function (response) {
  return response;
}, async function (error) {
  if (error) {
    console.log(error);
  }
});

export default {
  URL,
  sendRequestToAuth (): void {
    window.location.replace(AuthURL + 'authorize?' + querystring.stringify({
      response_type: 'code',
      client_id: clientID,
      scope,
      redirect_uri: redirectURI,
      state
    }));
  },
  getToken (code: string): Promise<AxiosResponse> {
    const body: TokenBody = {
      code,
      redirect_uri: redirectURI,
      grant_type: 'authorization_code'
    };
    return api.post('api/token', querystring.stringify(body), { headers: getHeaders() });
  },
  refreshToken (): Promise<AxiosResponse> {
    const body: RefreshTokenBody = {
      refresh_token: UserStore.getRefreshToken(),
      grant_type: 'refresh_token'
    };
    return api.post('api/token', querystring.stringify(body), { headers: getHeaders() });
  }
};
