import { IUser } from '.';

export interface IDataFriendRequest {
  createAt: Date;
  updateAt: Date;
  id?: string;
  _id?: string;
  status: string;
  user: IUser;
}

export interface IFriendRequest {
  data: IDataFriendRequest[];
  pagination: IPagination;
}
