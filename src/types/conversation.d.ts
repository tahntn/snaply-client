import { IUser } from '.';

interface ILastActivity {
  type: 'text' | 'image' | 'init';
  senderId: string;
  timestamp: Date;
}

export interface IDetailConversation {
  avatarGroup?: string;
  nameGroup?: string;
  createAt: Date;
  id: string;
  isGroup: boolean;
  lastActivity: ILastActivity;
  participants: IUser[];
}
