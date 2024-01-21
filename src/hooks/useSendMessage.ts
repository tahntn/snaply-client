import { postAxios } from '@/api';
import { IMessage } from '@/types';
import { useMutation } from '@tanstack/react-query';

interface DataType {
  title?: string;
  type: 'text' | 'image' | 'video' | 'file' | 'update' | 'gif' | 'sticker';
  imageList?: string[];
  replyTo?: string;
  url?: string;
}

export const useSendMessage = (conversation: string) => {
  return useMutation({
    mutationFn: (data: DataType) =>
      postAxios<IMessage, DataType>(`conversation/${conversation}/message`, data),
  });
};
