import { postAxios } from '@/api';
import { useToast } from '@/components/ui/use-toast';
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
  return useMutation({
    mutationFn: (data: DataType) => postAxios<IDetailConversation, DataType>('conversation', data),
    onSuccess: (data) => {
      console.log(data);
      navigate(`/conversation/${data._id || data.id}`);
    },
    onError: (error: any) => {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: error.response?.data?.message || 'Đã có lỗi xảy ra vui lòng đăng nhập lại',
      });
    },
  });
};
