import { IPagination, IUser } from '.';

export interface ISearchUser {
  data: IUser[];
  pagination: IPagination;
}
