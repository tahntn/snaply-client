import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Icons } from '@/components/ui/icons';
import FormAuth from './components/FormAuth';
import { loginSchema } from '@/schema';
import { useAuthStore } from '@/store';
import { fieldAuth } from '@/types';

const LoginPage = () => {
  const setLogin = useAuthStore((state) => state.setLogin);
  const [showPassword, setShowPassword] = React.useState(false);

  const form = useForm({
    resolver: yupResolver(loginSchema),
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
      label: 'Email',
      name: 'email',
      form: form,
      startAndornment: <Icons.user />,
      placeholder: 'Type your email',
    },
    {
      label: 'Password',
      name: 'password',
      form: form,
      startAndornment: <Icons.lockKeyhole />,
      endAndornment: (
        <div onClick={handleClickPassword}>{showPassword ? <Icons.eyeOff /> : <Icons.eye />}</div>
      ),
      placeholder: 'Type your password',
      type: showPassword ? 'text' : 'password',
    },
  ];
  return <FormAuth form={form} fieldAuth={fieldLogin} type="login" onSubmit={onSubmit} />;
};

export default LoginPage;
