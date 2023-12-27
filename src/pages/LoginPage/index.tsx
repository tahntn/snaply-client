/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { InputWithIcon } from '@/components/InputWithIcon';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Icons } from '@/components/ui/icons';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);

  const schema = yup
    .object()
    .shape({
      email: yup.string().email().required(),
      password: yup
        .string()
        .min(8)
        .matches(/[a-zA-Z]/, 'Password must contain at least one letter')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .required(),
    })
    .required();

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onSubmit = () => {};
  const handleClickPassword = () => setShowPassword((prev) => !prev);
  const toggleSignup = () => navigate('/sign-up');
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="bg-white px-16 py-16 min-w-[500px] rounded-lg">
        <h2 className="text-5xl text-center font-bold pb-[50px]">Login</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-2xl">Email</FormLabel>
                  <FormControl>
                    <InputWithIcon
                      startAndornment={<Icons.user />}
                      placeholder="Type your email"
                      {...field}
                      type={'string'}
                      className="h-12 text-lg px-3"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="my-10">
                  <FormLabel className="text-2xl">Password</FormLabel>
                  <FormControl>
                    <InputWithIcon
                      startAndornment={<Icons.lockKeyhole />}
                      endAndornment={
                        <div onClick={handleClickPassword} className="cursor-pointer">
                          {showPassword ? <Icons.eyeOff /> : <Icons.eye />}
                        </div>
                      }
                      placeholder="Type your password"
                      {...field}
                      type={showPassword ? 'string' : 'password'}
                      className="h-12 text-lg px-3"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full ">
              Login
            </Button>
            <div className="border-t-2 border-gray-500 my-10 w-[70%] mx-auto"></div>
            <p className="text-center">
              Don't have an account?{' '}
              <span onClick={toggleSignup} className="font-semibold cursor-pointer">
                Sign up now
              </span>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
