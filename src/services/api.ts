import axios, { AxiosResponse } from 'axios';
import { UserStore } from '../store/UserStore';
import auth from './auth';

const apiURL: string = import.meta.env.VITE_AUTH_SPOTIFY_API as string;

function getHeaders () {
  return {
    Authorization: 'Bearer ' + UserStore.getAccessToken(),
    'Content-Type': 'application/json'
  };
}

export const api = axios.create({
  baseURL: apiURL
});

api.interceptors.response.use(function (response) {
  return response;
}, async function (error) {
  if (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && UserStore.getRefreshToken()) {
      const { data } = await auth.refreshToken();
      UserStore.setAuth({ accessToken: data.access_token, refreshToken: data.refresh_token });
      const accessToken = getHeaders();
      originalRequest.headers.Authorization = accessToken.Authorization;
      return api(originalRequest);
    } else {
      return Promise.reject(error);
    }
  }
});

export default {
  URL,
  getCurrentInfo (endpoint = ''): Promise<AxiosResponse> {
    return api.get('me' + endpoint, { headers: getHeaders() });
  }
};
