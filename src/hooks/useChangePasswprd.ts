import { patchAxios } from '@/api';
import { useMutation } from '@tanstack/react-query';
import { useToastError } from '.';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
interface DataType {
  newPassword: string;
  oldPassword: string;
}

export const useChangePasswprd = () => {
  const { t } = useTranslation();
  const { throwError } = useToastError();
  return useMutation({
    mutationFn: (data: DataType) =>
      patchAxios<object, DataType>(`user/change-password`, undefined, data),
    onSuccess: () => {
      toast.success(t('setting.updateSuccess'));
    },
    onError: (e) => {
      throwError(e);
    },
  });
};
