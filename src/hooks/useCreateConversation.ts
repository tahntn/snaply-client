import { postAxios } from '@/api';
import { useGlobalStore } from '@/store';
import { IDetailConversation } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

interface DataType {
  participants: string[];
  isGroup: boolean;
  nameGroup?: string;
}

export const useCreateConversation = () => {
  const navigate = useNavigate();
  const handleCloseDialogOtherUser = useGlobalStore((state) => state.handleCloseDialogOtherUser);
  return useMutation({
    mutationFn: (data: DataType) => postAxios<IDetailConversation, DataType>('conversation', data),
    onSuccess: (data) => {
      handleCloseDialogOtherUser();
      navigate(`/conversation/${data._id || data.id}`);
    },
  });
};
