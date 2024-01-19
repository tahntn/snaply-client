import { IUser } from '.';

export interface IPagination {
  page: number;
  limit: number;
}

export interface IMessage {
  conversationId: string;
  createdAt: Date;
  updatedAt: Date;
  id?: string;
  _id?: string;
  imageList?: string[];
  isPin: boolean;
  senderId: IUser;
  title?: string;
  type: 'text' | 'image' | 'video' | 'file' | 'update';
}

export interface IMessages {
  data: IMessage[];
  pagination: IPagination;
}
