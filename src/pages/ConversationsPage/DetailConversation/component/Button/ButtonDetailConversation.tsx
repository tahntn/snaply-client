import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '@/components/ui/sheet';
import { Icons } from '@/components/ui/icons';
import { useDetailConversation, useGetMe } from '@/hooks';
import { useParams } from 'react-router-dom';
import NameConversation from '@/components/Conversation/NameConversation';
import { Separator } from '@/components/ui/separator';
import AvatarUser from '@/components/AvatarUser';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import DialogChangeNameGroup from '@/components/Dialog/DialogChangeNameGroup';
import ButtonDetailAvatarConversation from './ButtonDetailAvatarConversation';
import { DialogPinnedMessage } from '@/components/Dialog';
import AvatarConversation from '@/components/Conversation/AvatarConversation';

const ButtonDetailConversation = () => {
  const { conversationId } = useParams();
  const { data: currentUser } = useGetMe();
  const { t } = useTranslation();
  const { data: conversation, isLoading } = useDetailConversation(conversationId!);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full h-8 w-8">
          <Icons.info className="w-full h-full" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="flex flex-col items-center">
          {conversation?.isGroup ? (
            <ButtonDetailAvatarConversation isLoading={isLoading} conversation={conversation!} />
          ) : (
            <AvatarConversation
              isLoading={isLoading}
              conversation={conversation!}
              classNameAvatar="h-24 w-24  "
              classNameSkeleton="h-10 w-10"
              classNameWrap="relative group"
            ></AvatarConversation>
          )}

          <div className="w-full relative group">
            <NameConversation
              isLoading={isLoading}
              conversation={conversation!}
              classNameText="text-xl font-bold line-clamp-2 text-center break-words"
              classNameSkeleton="h-5  bg-foreground flex-1"
            />

            <div
              className={cn(
                'hidden absolute  top-1/2 -translate-y-1/2  right-[0px]',
                conversation?.isGroup && 'group-hover:block'
              )}
            >
              <DialogChangeNameGroup
                nameGroup={conversation?.nameGroup || ''}
                idConversation={(conversation?._id || conversation?.id)!}
              />
            </div>
          </div>
        </SheetHeader>
        <Separator className="w-full my-5" />
        <div className="max-h-[calc(100vh-240px)] overflow-auto">
          <div>
            <h3 className="text-xl font-medium">{t('conversation.detailConversation.members')}</h3>
            <div className="grid gap-4 my-4">
              {conversation?.participants
                .filter((item) => item._id !== currentUser?.id && item.id !== currentUser?.id)
                .map((user) => (
                  <div className="flex gap-3 items-center" key={user?._id || user?.id}>
                    <AvatarUser url={user?.avatar} name={user?.username} />
                    <h4 className="text-xl font-bold">{user.username}</h4>
                  </div>
                ))}
            </div>
          </div>
          <Separator className="w-full my-5" />
          <h3 className="text-xl font-medium">
            {t('conversation.detailConversation.otherAction')}
          </h3>
          <ul className="my-4">
            <li>
              <DialogPinnedMessage
                conversationId={(conversation?._id || conversation?.id)!}
                pinnedMessagesCount={conversation?.pinnedMessagesCount}
              />
            </li>
          </ul>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ButtonDetailConversation;
