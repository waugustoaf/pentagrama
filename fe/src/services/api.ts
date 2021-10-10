import axios from 'axios';
import { parseCookies } from 'nookies';

const { '@OfficeCosts:token': token } = parseCookies();

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

if (token) {
  api.defaults.headers.authorization = `Bearer ${token}`;
}
