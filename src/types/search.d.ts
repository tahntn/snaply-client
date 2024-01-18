import { IPagination, IUser } from '.';

export interface ISearchUser {
  data: IUser[];
  pagination: IPagination;
}

export interface idOtherUser {
  data: IUser;
  friendShip: IFriend | null;
}

interface IFriend {
  createdAt: Date;
  id: Date;
  status: 'accept' | 'pending';
  targetUserId: string;
  updatedAt: Date;
  userId: string;
}
