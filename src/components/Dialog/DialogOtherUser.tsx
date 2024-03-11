/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useGlobalStore } from '@/store';
import { useConfirmFriendRequest, useCreateConversation, useGetMe, useOtherUser } from '@/hooks';
import AvatarUser from '../AvatarUser';
import { Icons } from '../ui/icons';
import { Text } from '@radix-ui/themes';
import { Button } from '../ui/button';
import SkeletonAvatar from '../Skeleton/SkeletonAvatar';
import SkeletonText from '../Skeleton/SkeletonText';
import { useCreateFriendRequest } from '@/hooks/useCreateFriendRequest';
import { useTranslation } from 'react-i18next';
const DialogOtherUser = () => {
  const { isOpenDialogOtherUser, idOtherUser, handleCloseDialogOtherUser } = useGlobalStore(
    (state) => state
  );
  const { t } = useTranslation();
  const { mutate: createConversation } = useCreateConversation();
  const { mutate: createFriendRequest } = useCreateFriendRequest();
  const { data: currentUser } = useGetMe();
  const { data, isLoading } = useOtherUser(idOtherUser!);
  const { mutate: confirmFriendRequest } = useConfirmFriendRequest(
    data?.friendShip?.id!,
    idOtherUser || undefined
  );
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
            <Button
              onClick={() => {
                console.log(data);

                if (!data?.friendShip) {
                  createFriendRequest((data?.data._id || data?.data.id)!);
                } else if (
                  data.friendShip.status === 'pending' &&
                  data?.friendShip?.targetUserId === currentUser?.id
                ) {
                  confirmFriendRequest();
                }
              }}
            >
              {data?.friendShip?.status === 'accept' ? (
                <Icons.user className="w-5 h-5" />
              ) : data?.friendShip?.status === 'pending' ? (
                data?.friendShip?.targetUserId === currentUser?.id ? (
                  <Icons.userRoundCheck />
                ) : (
                  <Icons.circleDashed />
                )
              ) : (
                <Icons.userPlus className="w-5 h-5" />
              )}

              {isLoading || !data ? (
                <SkeletonText className="w-20 bg-white ml-2" />
              ) : !data?.friendShip ? (
                <Text className="pl-2">{t('friend.addFriend')}</Text>
              ) : data?.friendShip?.status === 'accept' ? (
                <Text className="pl-2">{t('friend.friend')}</Text>
              ) : data?.friendShip?.targetUserId === currentUser?.id ? (
                <Text className="pl-2">{t('friend.confirm')}</Text>
              ) : (
                <Text className="pl-2">{t('friend.pending')}</Text>
              )}
            </Button>

            <Button
              onClick={() => {
                createConversation({
                  participants: [(data?.data._id || data?.data.id)!],
                  isGroup: false,
                });
              }}
            >
              <Icons.messageCircle className="w-5 h-5" />
              <Text className="pl-2">{t('friend.message')}</Text>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogOtherUser;
