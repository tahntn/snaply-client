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
import { useGetMe } from '@/hooks';
import SkeletonAvatar from '../Skeleton/SkeletonAvatar';
import AvatarUser from '../AvatarUser';
import SkeletonText from '../Skeleton/SkeletonText';
import { Separator } from '../ui/separator';
import { Input } from '../ui/input';
const ButtonUser = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useGetMe();
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
              <h4 className="text-xl font-semibold text-foreground">Username</h4>
              <Input value={data?.username} size={5} disabled />
            </div>
            <div className="flex flex-col gap-1">
              <h4 className="text-xl font-semibold text-foreground">Email</h4>
              <Input value={data?.email} size={5} disabled />
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose>
            <Button variant={'outline'}>{t('setting.cancel')}</Button>
          </DialogClose>
          <DialogClose>
            {/* <Button onClick={handleLogout}>{t('setting.logout.logout')}</Button> */}
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ButtonUser;
