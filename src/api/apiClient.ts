import { axiosInstance } from './apiConfig';

export async function getAxios<T>(endpoint: string, params?: Record<string, string | number>) {
  const res = await axiosInstance.get<T>(endpoint, { params });
  return res.data;
}

export async function deleteAxios<T>(endpoint: string, id: string) {
  const res = await axiosInstance.delete<T>(`${endpoint}/${id}`);
  return res.data;
}

export async function postAxios<RT, BT>(endpoint: string, arg?: BT) {
  const res = await axiosInstance.post<RT>(`${endpoint}`, arg);
  return res.data;
}

export async function patchAxios<RT, BT>(endpoint: string, id: string, arg: BT) {
  const res = await axiosInstance.patch<RT>(`${endpoint}/${id}`, arg);
  return res.data;
}
