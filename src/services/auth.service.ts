import { BASE_URL } from '@/api/apiConfig';
import axios from 'axios';

export const refreshAccessToken = async (refreshToken: string) => {
  return await axios.post(`${BASE_URL}/api/v1/auth/refresh-tokens`, {
    refreshToken,
  });
};

export const logoutService = async (refreshToken: string) => {
  return await axios.post(`${BASE_URL}/api/v1/auth/logout`, {
    refreshToken,
  });
};
