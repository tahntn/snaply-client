import React from 'react';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { signupSchema } from '@/schema';
import { fieldAuth } from '@/types';
import { Icons } from '@/components/ui/icons';
import FormAuth from './components/FormAuth';
const SignupPage = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const form = useForm({
    resolver: yupResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
      username: '',
      confirmPassword: '',
    },
  });
  const onSubmit = () => {};
  const handleClickPassword = () => setShowPassword((prev) => !prev);
  const handleClickConfirmPassword = () => setShowConfirmPassword((prev) => !prev);
  const fieldLogin: fieldAuth[] = [
    {
      label: 'Email',
      name: 'email',
      form: form,
      startAndornment: <Icons.mail />,
      placeholder: 'Type your email',
    },
    {
      label: 'Username',
      name: 'username',
      form: form,
      startAndornment: <Icons.user />,
      placeholder: 'Type your username',
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
    {
      label: 'Password',
      name: 'confirmPassword',
      form: form,
      startAndornment: <Icons.lockKeyhole />,
      endAndornment: (
        <div onClick={handleClickConfirmPassword}>
          {showConfirmPassword ? <Icons.eyeOff /> : <Icons.eye />}
        </div>
      ),
      placeholder: 'Type your confirmPassword',
      type: showConfirmPassword ? 'text' : 'password',
    },
  ];
  return <FormAuth form={form} fieldAuth={fieldLogin} type="signup" onSubmit={onSubmit} />;
};

export default SignupPage;
