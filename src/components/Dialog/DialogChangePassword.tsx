import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { useSettingStore } from '@/store';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { InputWithIcon } from '../InputWithIcon';
import React from 'react';
import { Icons } from '../ui/icons';
import { Button } from '../ui/button';
import { useChangePasswprd } from '@/hooks';
const DialogChangePassword = () => {
  const { mutateAsync } = useChangePasswprd();
  const { openChangePassword, handleOpenDialogPassword } = useSettingStore((s) => s);
  const { t } = useTranslation();
  const schema = yup.object().shape({
    currentPassword: yup.string().required(t('signup.validate.password.required')),
    newPassword: yup
      .string()
      .required(t('signup.validate.password.required'))
      .matches(/[a-zA-Z]/, t('signup.validate.password.character'))
      .matches(/[0-9]/, t('signup.validate.password.number'))
      .min(8, t('signup.validate.password.min'))
      .max(20, t('signup.validate.password.max')),
    confirmPassword: yup
      .string()
      .required(t('signup.validate.confirmPassword.required'))
      .oneOf([yup.ref('newPassword')], t('signup.validate.confirmPassword.match')),
  });
  const form = useForm({
    resolver: yupResolver(schema),
    values: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async ({
    currentPassword,
    newPassword,
  }: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    await mutateAsync({
      newPassword,
      oldPassword: currentPassword,
    });
    form.reset();
    handleOpenDialogPassword();
  };
  const [showPassword, setShowPassword] = React.useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const handleClickPassword = (key: keyof typeof showPassword) => {
    setShowPassword((prev) => ({
      ...prev,
      [key]: !prev?.[key],
    }));
  };
  return (
    <Dialog open={openChangePassword} onOpenChange={handleOpenDialogPassword}>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle className="text-xl font-medium text-center">Đổi mật khẩu</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={cn('text-lg  ')}>Mật khẩu hiện tại</FormLabel>
                    <FormControl>
                      <InputWithIcon
                        endAndornment={
                          <div className="text-black_custom-500 cursor-pointer ">
                            <div onClick={() => handleClickPassword('currentPassword')}>
                              {showPassword.currentPassword ? <Icons.eyeOff /> : <Icons.eye />}
                            </div>
                          </div>
                        }
                        placeholder={'Mật khẩu hiện tại'}
                        {...field}
                        type={showPassword.currentPassword ? 'text' : 'password'}
                        className={cn(
                          'h-12 text-black_custom-500 px-3 text:text-primary-foreground',
                          'xs:h-10 text-base'
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={cn('text-lg  ')}>Mật khẩu mới</FormLabel>
                    <FormControl>
                      <InputWithIcon
                        endAndornment={
                          <div className="text-black_custom-500 cursor-pointer ">
                            <div onClick={() => handleClickPassword('newPassword')}>
                              {showPassword.newPassword ? <Icons.eyeOff /> : <Icons.eye />}
                            </div>
                          </div>
                        }
                        placeholder={'Mật khẩu mới'}
                        {...field}
                        type={showPassword.newPassword ? 'text' : 'password'}
                        className={cn(
                          'h-12 text-black_custom-500 px-3 text:text-primary-foreground',
                          'xs:h-10 text-base'
                        )}
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
                    <FormLabel className={cn('text-lg  ')}>Xác nhận mật khẩu</FormLabel>
                    <FormControl>
                      <InputWithIcon
                        endAndornment={
                          <div className="text-black_custom-500 cursor-pointer ">
                            <div onClick={() => handleClickPassword('confirmPassword')}>
                              {showPassword.confirmPassword ? <Icons.eyeOff /> : <Icons.eye />}
                            </div>
                          </div>
                        }
                        placeholder={'Xác nhận mật khẩu'}
                        {...field}
                        type={showPassword.confirmPassword ? 'text' : 'password'}
                        className={cn(
                          'h-12 text-black_custom-500 px-3 text:text-primary-foreground',
                          'xs:h-10 text-base'
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="mt-3">
              <DialogClose>
                <Button variant={'outline'} size={'sm'}>
                  {t('setting.cancel')}
                </Button>
              </DialogClose>
              <Button size={'sm'} type="submit">
                {t('setting.apply')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogChangePassword;
