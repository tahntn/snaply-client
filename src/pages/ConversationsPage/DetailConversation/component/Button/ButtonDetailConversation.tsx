import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '@/components/ui/sheet';
import { Icons } from '@/components/ui/icons';
import { useDetailConversation, useGetMe } from '@/hooks';
import { useParams } from 'react-router-dom';
import AvatarConversation from '@/components/Conversation/AvatarConversation';
import NameConversation from '@/components/Conversation/NameConversation';
import { Separator } from '@/components/ui/separator';
import AvatarUser from '@/components/AvatarUser';
import { useTranslation } from 'react-i18next';
import { Text } from '@radix-ui/themes';
import { cn } from '@/lib/utils';
import DialogChangeNameGroup from '@/components/Dialog/DialogChangeNameGroup';

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
          <div>
            <AvatarConversation
              isLoading={isLoading}
              conversation={conversation!}
              classNameAvatar="h-24 w-24  "
              classNameSkeleton="h-10 w-10"
              classNameWrap="relative group"
            >
              <div className="absolute hidden group-hover:flex items-center justify-center inset-0 cursor-pointer rounded-full backdrop-blur-md">
                <Icons.pencil className="w-[30px] h-[30px ]" />
              </div>
            </AvatarConversation>
          </div>
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
                  <div className="flex gap-3 items-center">
                    <AvatarUser url={user.avatar} name={user.username} />
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
            <li className="flex items-center gap-2">
              <div className="pt-[4px]">
                <Icons.pin className="h-5 w-5" />
              </div>
              <Text className="text-lg font-medium flex-1 lin">Tin nhắn đã ghim</Text>
              <Text className="text-lg font-medium ">2</Text>
              <div className="pt-[4px]">
                <Icons.chevronRight className="h-6 w-6" />
              </div>
            </li>
          </ul>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ButtonDetailConversation;
