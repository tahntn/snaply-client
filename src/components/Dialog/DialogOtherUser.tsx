import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useGlobalStore } from '@/store';
import { useGetMe, userOtherUser } from '@/hooks';
import AvatarUser from '../AvatarUser';
import { Icons } from '../ui/icons';
import { Text } from '@radix-ui/themes';
import { Button } from '../ui/button';
import SkeletonAvatar from '../Skeleton/SkeletonAvatar';
import SkeletonText from '../Skeleton/SkeletonText';
const DialogOtherUser = () => {
  const { isOpenDialogOtherUser, idOtherUser, handleCloseDialogOtherUser } = useGlobalStore(
    (state) => state
  );
  const { data: currentUser } = useGetMe();
  const { data, isLoading } = userOtherUser(idOtherUser!);
  console.log('🚀 ~ DialogOtherUser ~ data:', data);

  return (
    <Dialog open={!!isOpenDialogOtherUser} onOpenChange={handleCloseDialogOtherUser}>
      <DialogContent className="sm:max-w-[425px]">
        <div className="w-full flex flex-col justify-center">
          <div className="w-full flex items-center justify-center">
            {isLoading || !data ? (
              <SkeletonAvatar className="w-16 h-16" />
            ) : (
              <AvatarUser
                name={data?.data?.username!}
                url={data?.data?.avatar!}
                classNameAvatar="w-16 h-16"
              />
            )}
          </div>
          {isLoading || !data ? (
            <div className="flex justify-center  pt-3">
              <SkeletonText className="w-20" />
            </div>
          ) : (
            <h3 className="text-center text-xl font-medium pt-3">{data?.data?.username}</h3>
          )}
          <div className="flex justify-center items-center gap-2 pt-2">
            <Icons.mail />
            {isLoading || !data ? (
              <SkeletonText className="w-32" />
            ) : (
              <Text className="text-lg font-semibold">{data?.data?.email}</Text>
            )}
          </div>

          <div className="flex justify-center items-center gap-2 pt-4">
            <Button>
              <Icons.userPlus className="w-5 h-5" />

              {isLoading || !data ? (
                <SkeletonText className="w-20 bg-white ml-2" />
              ) : !data?.friendShip ? (
                <Text className="pl-2">Add friend</Text>
              ) : data?.friendShip?.status === 'accept' ? (
                <Text className="pl-2">Friend</Text>
              ) : data?.friendShip?.targetUserId === currentUser?.id ? (
                <Text className="pl-2">Confirm</Text>
              ) : (
                <Text className="pl-2">Pending</Text>
              )}
            </Button>

            <Button>
              <Icons.messageCircle className="w-5 h-5" />
              <Text className="pl-2">Message</Text>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogOtherUser;
