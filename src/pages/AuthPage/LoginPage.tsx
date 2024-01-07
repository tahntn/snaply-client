import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import FormAuth from './components/FormAuth';
import { loginSchema } from '@/schema';
import { fieldAuth, loginBody } from '@/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '@/hooks';
import { Icons } from '@/components/ui/icons';

const LoginPage = () => {
  const { mutate: login } = useAuth('login');
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = React.useState(false);

  const form = useForm<loginBody>({
    resolver: yupResolver(loginSchema()),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onSubmit = (data: loginBody) => {
    login({
      email: data.email,
      password: data.password,
    });
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
