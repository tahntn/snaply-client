import { postAxios } from '@/api';
import { useToast } from '@/components/ui/use-toast';
import { useGlobalStore } from '@/store';
import { IDetailConversation } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

interface DataType {
  participants: string[];
  isGroup: boolean;
}

export const useCreateConversation = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const handleCloseDialogOtherUser = useGlobalStore((state) => state.handleCloseDialogOtherUser);
  return useMutation({
    mutationFn: (data: DataType) => postAxios<IDetailConversation, DataType>('conversation', data),
    onSuccess: (data) => {
      handleCloseDialogOtherUser();
      navigate(`/conversation/${data._id || data.id}`);
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: error.response?.data?.message || 'Đã có lỗi xảy ra vui lòng đăng nhập lại',
      });
    },
  });
};
