import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Icons } from '../ui/icons';
import { Text } from '@radix-ui/themes';
import { useTranslation } from 'react-i18next';
import { useMessages } from '@/hooks';
import { useInView } from 'react-intersection-observer';
import { IMessage } from '@/types';

import AvatarUser from '../AvatarUser';
import TextMessage from '@/pages/ConversationsPage/DetailConversation/component/Message/TextMessage';
import { Button } from '../ui/button';
import ImageMessage from '@/pages/ConversationsPage/DetailConversation/component/Message/ImageMessage';

interface DialogPinnedMessageProps {
  pinnedMessagesCount?: number;
  conversationId: string;
}

const DialogPinnedMessage: React.FC<DialogPinnedMessageProps> = ({
  pinnedMessagesCount,
  conversationId,
}) => {
  const { t } = useTranslation();

  const { data, fetchNextPage, isError, isLoading, hasNextPage, isFetchingNextPage } = useMessages(
    conversationId,
    5,
    true
  );
  const { ref, inView } = useInView();

  React.useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-center gap-2 cursor-pointer w-full">
          <div className="pt-[4px]">
            <Icons.pin className="h-5 w-5" />
          </div>
          <Text className="text-lg font-medium flex-1 lin">
            {t('conversation.detailConversation.messagePinned')}
          </Text>
          <Text className="text-lg font-medium ">{pinnedMessagesCount}</Text>
          <div className="pt-[4px]">
            <Icons.chevronRight className="h-6 w-6" />
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">
            {t('conversation.detailConversation.messagePinned')}
          </DialogTitle>
        </DialogHeader>
        <div className="max-h-[calc(100vh-300px)] overflow-auto flex gap-5 flex-col px-5">
          {data?.pages.map((page) => page.data.map((messsage) => renderItem(messsage)))}
          <div ref={ref} style={{ height: '10px' }} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogPinnedMessage;

const renderItem = (messsage: IMessage) => (
  <div className="flex gap-3 items-end">
    <AvatarUser
      name={messsage.senderId.username?.[0]}
      url={messsage.senderId?.avatar}
      // classNameAvatar="w-12 h-12"
    />
    <div className="flex-1 flex flex-col">
      <Text className="font-semibold text-xl ">{messsage.senderId.username}</Text>
      {messsage.type === 'text' ? (
        <TextMessage title={messsage.title!} />
      ) : (
        <ImageMessage imageList={messsage.imageList!} />
      )}
    </div>
    <Button size={'sm'} variant={'outline'} className="rounded-full">
      <Icons.moreHorizontal />
    </Button>
  </div>
);
