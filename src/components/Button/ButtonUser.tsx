import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useTranslation } from 'react-i18next';
import { Icons } from '../ui/icons';
import { useGetMe, useToastError, useUpdateUser } from '@/hooks';
import SkeletonAvatar from '../Skeleton/SkeletonAvatar';
import AvatarUser from '../AvatarUser';
import SkeletonText from '../Skeleton/SkeletonText';
import { Separator } from '../ui/separator';
import { Input } from '../ui/input';
import React from 'react';
import { useQueryClient } from '@tanstack/react-query';
const ButtonUser = () => {
  const queryClient = useQueryClient();
  const { throwError } = useToastError();
  const { t } = useTranslation();
  const { data, isLoading } = useGetMe();
  const [isEditName, setIsEditName] = React.useState(true);
  const [isEditEmail, setIsEditEmail] = React.useState(true);
  const [username, setUsername] = React.useState(data?.username);
  const [email, setEmail] = React.useState(data?.email);
  const { mutateAsync: updateUser, isLoading: isLoadingUpdateUser } = useUpdateUser((data) => {
    queryClient.setQueryData(['me'], () => data);
  });

  const handleClickUsername = async (
    data: {
      username?: string;
      email?: string;
    },
    isEdit: boolean,
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    if (isEdit) {
      setIsEdit((prev) => !prev);
      return;
    }
    try {
      await updateUser(data);
      setIsEdit((prev) => !prev);
    } catch (error) {
      throwError(error);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex gap-1 items-center cursor-pointer">
          <div>
            <Icons.user className="mr-2 h-4-w-4" />
          </div>
          <p>{t('setting.account.account')}</p>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{t('setting.account.account')}</DialogTitle>
        </DialogHeader>
        <div className="">
          <div className="flex flex-col gap-2 items-center justify-center">
            {isLoading ? (
              <>
                <SkeletonAvatar className="h-20 w-20" />
                <SkeletonText className="text-2xl w-5" />
              </>
            ) : (
              <>
                <AvatarUser classNameAvatar="h-20 w-20" url={data!.avatar} name={data!.username} />
                <h4 className="text-2xl font-semibold">{data?.username}</h4>
              </>
            )}
          </div>
          <Separator className="my-6" />
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <h4 className="text-xl font-semibold text-foreground">{t('signup.form.username')}</h4>

              <div className="flex gap-1">
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  size={5}
                  disabled={isEditName}
                />
                <Button
                  onClick={() => handleClickUsername({ username }, isEditName, setIsEditName)}
                  disabled={isLoadingUpdateUser}
                >
                  {isEditName ? (
                    <Icons.pencil className="h-[18px] w-[18px] text-background" />
                  ) : (
                    <Icons.check className="h-[18px] w-[18px] text-background" />
                  )}
                </Button>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <h4 className="text-xl font-semibold text-foreground">{t('signup.form.email')}</h4>
              <div className="flex gap-1">
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  size={5}
                  disabled={isEditEmail}
                />
                <Button
                  onClick={() => handleClickUsername({ email }, isEditEmail, setIsEditEmail)}
                  disabled={isLoadingUpdateUser}
                >
                  {isEditEmail ? (
                    <Icons.pencil className="h-[18px] w-[18px] text-background" />
                  ) : (
                    <Icons.check className="h-[18px] w-[18px] text-background" />
                  )}
                </Button>
              </div>
            </div>
          </div>
          <Separator className="my-6 mb-3" />
          <div>
            <Button variant="link" className="px-1 py-1">
              {t('setting.changePassword')}
            </Button>
          </div>
        </div>
        <DialogFooter>
          <DialogClose>
            <Button variant={'outline'}>{t('setting.close')}</Button>
          </DialogClose>
          <DialogClose></DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ButtonUser;
