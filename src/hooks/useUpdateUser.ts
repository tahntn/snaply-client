import { patchAxios } from '@/api';
import { IUser } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

interface DataType {
  username?: string;
  email?: string;
  avatar?: string;
}

export const useUpdateUser = (cb?: (data: IUser) => void) => {
  const { t } = useTranslation();
  return useMutation({
    mutationFn: (data: DataType) => patchAxios<IUser, DataType>('user', undefined, data),
    onSuccess: (data) => {
      cb && cb(data);
      toast.success(t('setting.updateSuccess'));
    },
  });
};
