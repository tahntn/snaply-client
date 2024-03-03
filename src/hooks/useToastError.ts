import React from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
export const useToastError = () => {
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const { t } = useTranslation();
  React.useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      setErrorMessage(null);
    }
  }, [errorMessage]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const throwError = (error: any, error2?: string) => {
    const _error = (error.response?.data?.message || error2) as string | undefined;
    setErrorMessage(_error || t('setting.error.errorOccurred'));
  };

  return { throwError };
};
