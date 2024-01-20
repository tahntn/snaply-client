import { IUser } from '.';

export interface IFriendRequest {
  createdAt: Date;
  id: Date;
  status: 'accept' | 'pending';
  targetUserId: string;
  updatedAt: Date;
  user: IUser;
}
