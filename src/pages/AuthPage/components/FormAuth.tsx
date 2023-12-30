import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import React from 'react';
import FormFieldAuth from './FormFieldAuth';
import { fieldAuth } from '@/types';
import { Link } from 'react-router-dom';
import { useTheme } from '@/context/ThemeProvider';

interface FormAuthProps {
  form: any;
  onSubmit: any;
  fieldAuth: fieldAuth[];
  type: 'login' | 'signup';
}

const FormAuth: React.FC<FormAuthProps> = ({ form, onSubmit, fieldAuth, type }) => {
  const { mainTheme } = useTheme();
  return (
    <div className={cn('flex flex-1 justify-center my-10 ', 'lg:items-center')}>
      <div
        className={cn(
          'px-16 rounded-lg',
          'lg:bg-primary xs:bg-background sm:bg-background',
          'lg:py-16 sm:pt-12 xs:pt-10 xs:px-10 xxs:px-8',
          'sm:min-w-[500px] xs:w-full '
        )}
      >
        <h2
          className={cn(
            'text-5xl text-center font-bold pb-[50px] ',
            'lg:text-primary-foreground',
            'xs:text-4xl xxs:text-3xl'
          )}
        >
          {type === 'login' ? 'Log in' : 'Sign up'}
        </h2>
        <Form {...form}>
          <form onSubmit={form?.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            {fieldAuth.map((field, index) => (
              <FormFieldAuth
                key={index}
                form={field.form}
                label={field.label}
                name={field.name}
                startAndornment={field.startAndornment}
                endAndornment={field.endAndornment}
                placeholder={field.placeholder}
                type={field.type}
              />
            ))}

            <Button
              type="submit"
              className="w-full mt-5"
              variant={mainTheme === 'light' ? 'destructive' : 'outline'}
            >
              {type === 'login' ? 'Login' : 'Signup'}
            </Button>
            <div className="border-t-2 border-gray-500 my-10 w-[70%] mx-auto "></div>
            <p className={cn('text-center', 'lg:text-primary-foreground', 'xs:text-sm ')}>
              {type === 'login' ? "Don't have an account?" : '  Already have an account?'}
              <span className="font-semibold cursor-pointer">
                <Link to={`/${type === 'login' ? 'signup' : 'login'}`}> Sign up now</Link>
              </span>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default FormAuth;
