import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Icons } from '@/components/ui/icons';
import { InputWithIcon } from '@/components/InputWithIcon';
import { Button } from '@/components/ui/button';
import { signupSchema } from '@/schema';
const SignupPage = () => {
  const navigate = useNavigate();
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
  const toggleLogin = () => navigate('/login');
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="bg-white px-16 py-16 min-w-[500px] rounded-lg">
        <h2 className="text-5xl text-center font-bold pb-[50px]">Sign up</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-2xl">Email</FormLabel>
                  <FormControl>
                    <InputWithIcon
                      startAndornment={<Icons.mail />}
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
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-2xl">Username</FormLabel>
                  <FormControl>
                    <InputWithIcon
                      startAndornment={<Icons.user />}
                      placeholder="Type your username"
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
                <FormItem>
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-2xl">Confirm password</FormLabel>
                  <FormControl>
                    <InputWithIcon
                      startAndornment={<Icons.lock />}
                      endAndornment={
                        <div onClick={handleClickConfirmPassword} className="cursor-pointer">
                          {showConfirmPassword ? <Icons.eyeOff /> : <Icons.eye />}
                        </div>
                      }
                      placeholder="Type your confirm password"
                      {...field}
                      type={showConfirmPassword ? 'string' : 'password'}
                      className="h-12 text-lg px-3"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full ">
              Sign up
            </Button>
            <div className="border-t-2 border-gray-500 my-10 w-[70%] mx-auto"></div>
            <p className="text-center">
              Already have an account?{' '}
              <span onClick={toggleLogin} className="font-semibold cursor-pointer">
                Log in now
              </span>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignupPage;
