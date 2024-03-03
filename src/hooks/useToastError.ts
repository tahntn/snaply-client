import React from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
export const useToastError = () => {
  const { t } = useTranslation();
  const throwError = React.useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (error: any, error2?: string) => {
      const _error = (error.response?.data?.message || error2) as string | undefined;
      console.log('hi');

      toast.error(_error || t('setting.error.errorOccurred'));
    },
    []
  );
  return { throwError };
};
