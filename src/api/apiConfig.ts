import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: (import.meta.env.VITE_APP_BASE_API! as string) + '/api/v1',
  timeout: 30000,
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
});

export const EndPoints = {
  auth: 'auth',
  user: 'user',
} as const;

type EndPointType = typeof EndPoints;
type EndPointsKeys = keyof EndPointType;

export type EndPointsValues = EndPointType[EndPointsKeys];
