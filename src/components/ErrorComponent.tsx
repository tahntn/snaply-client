import React from 'react';
import { useTranslation } from 'react-i18next';

const ErrorComponent = () => {
  const { t } = useTranslation();

  React.useEffect(() => {
    // const handleAlert = () => {
    //   const result = window.confirm(t('setting.error.apiUnavailable'));
    //   console.log('🚀 ~ handleAlert ~ result:', result);
    //   if (result) {
    //     window.location.reload();
    //   }
    // };
    const handleAlert = () => {
      window.alert(t('setting.error.apiUnavailable'));
      window.location.reload();
    };

    handleAlert();
  }, []);

  return null;
};

export default ErrorComponent;
