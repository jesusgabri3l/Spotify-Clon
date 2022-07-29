import axios, { AxiosResponse } from 'axios';
import { UserStore } from '../store/UserStore';

const apiURL: string = import.meta.env.VITE_AUTH_SPOTIFY_API as string;

function getHeaders () {
  return {
    Authorization: 'Bearer ' + UserStore.auth.accessToken,
    'Content-Type': 'application/json'
  };
}

export const api = axios.create({
  baseURL: apiURL
});

export default {
  URL,
  getCurrentInfo (endpoint = ''): Promise<AxiosResponse> {
    return api.get('me' + endpoint, { headers: getHeaders() });
  }
};
