import React from 'react';
import { useTranslation } from 'react-i18next';

const ErrorComponent = () => {
  const { t } = useTranslation();

  React.useEffect(() => {
    const handleAlert = () => {
      window.alert(t('setting.error.apiUnavailable'));
      window.location.reload();
    };
    handleAlert();
  }, []);

  return null;
};

export default ErrorComponent;
