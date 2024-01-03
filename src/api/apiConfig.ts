import axios from 'axios';

export const BASE_URL = import.meta.env.VITE_APP_BASE_API! as string;

export const axiosInstance = axios.create({
  baseURL: BASE_URL + '/api/v1',
  timeout: 30000,
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
});
