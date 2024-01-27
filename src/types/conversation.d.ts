import { IMessage, IPagination, IUser } from '.';

interface ILastActivity {
  type: 'text' | 'image' | 'init';
  senderId: string;
  timestamp: Date;
}

export interface IDetailConversation {
  avatarGroup?: string;
  nameGroup?: string;
  createAt: Date;
  id?: string;
  _id?: string;
  isGroup: boolean;
  lastActivity: {
    lastMessage: IMessage;
  };
  participants: IUser[];
}

export interface IConversations {
  data: IDetailConversation[];
  pagination: IPagination;
}
