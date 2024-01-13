import { axiosInstance } from './apiConfig';

// method
export async function getAxios<T>(endpoint: string, params?: Record<string, any>) {
  return await axiosInstance.get<T>(endpoint, { params });
}

export async function deleteAxios<T>(endpoint: string, id: string) {
  return await axiosInstance.delete<T>(`${endpoint}/${id}`);
}

export async function postAxios<T>(endpoint: string, arg: T) {
  return await axiosInstance.post<T>(`${endpoint}`, arg);
}

export async function putAxios<RT, BT>(endpoint: string, id: string, arg: BT) {
  return await axiosInstance.put<RT>(`${endpoint}/${id}`, arg);
}
