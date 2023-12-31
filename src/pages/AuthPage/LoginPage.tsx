import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Icons } from '@/components/ui/icons';
import FormAuth from './components/FormAuth';
import { loginSchema } from '@/schema';
import { useAuthStore } from '@/store';
import { fieldAuth } from '@/types';
import { useTranslation } from 'react-i18next';

const LoginPage = () => {
  const setLogin = useAuthStore((state) => state.setLogin);
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = React.useState(false);

  const form = useForm({
    resolver: yupResolver(loginSchema()),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onSubmit = () => {
    setLogin();
  };
  const handleClickPassword = () => setShowPassword((prev) => !prev);

  const fieldLogin: fieldAuth[] = [
    {
      label: t('login.form.email'),
      name: 'email',
      form: form,
      startAndornment: <Icons.user />,
      placeholder: t('login.form.placeholderEmail'),
    },
    {
      label: t('login.form.password'),
      name: 'password',
      form: form,
      startAndornment: <Icons.lockKeyhole />,
      endAndornment: (
        <div onClick={handleClickPassword}>{showPassword ? <Icons.eyeOff /> : <Icons.eye />}</div>
      ),
      placeholder: t('login.form.placeholderPassword'),
      type: showPassword ? 'text' : 'password',
    },
  ];
  return <FormAuth form={form} fieldAuth={fieldLogin} type="login" onSubmit={onSubmit} />;
};

export default LoginPage;
