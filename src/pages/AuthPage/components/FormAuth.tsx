import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import React from 'react';
import FormFieldAuth from './FormFieldAuth';
import { fieldAuth } from '@/types';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '@/context/ThemeProvider';
import { useTranslation } from 'react-i18next';

interface FormAuthProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (data: any) => void;
  fieldAuth: fieldAuth[];
  type: 'login' | 'signup';
}

const FormAuth: React.FC<FormAuthProps> = ({ form, onSubmit, fieldAuth, type }) => {
  const { mainTheme } = useTheme();
  const { t } = useTranslation();
  const location = useLocation();
  const redirectParam = new URLSearchParams(location.search).get('redirect');
  const redirectQuery = redirectParam ? `?redirect=${encodeURIComponent(redirectParam)}` : '';

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
          {type === 'login' ? t('login.title') : t('signup.title')}
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
              {type === 'login' ? t('login.button.title') : t('signup.button.title')}
            </Button>
            <div className="border-t-2 border-gray-500 my-10 w-[70%] mx-auto "></div>
            <p className={cn('text-center', 'lg:text-primary-foreground', 'xs:text-sm ')}>
              {type === 'login' ? t('login.prompt.noAccount') : t('signup.prompt.haveAccount')}
              <span className="font-semibold cursor-pointer">
                <Link to={`/${type === 'login' ? 'signup' : 'login'}${redirectQuery}`}>
                  {' '}
                  {type === 'login' ? t('login.prompt.signup') : t('signup.prompt.login')}
                </Link>
              </span>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default FormAuth;
