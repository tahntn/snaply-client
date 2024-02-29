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
import { Separator } from '../ui/separator';

interface DialogPinnedMessageProps {
  pinnedMessagesCount?: number;
  conversationId: string;
}

const DialogPinnedMessage: React.FC<DialogPinnedMessageProps> = ({
  pinnedMessagesCount,
  conversationId,
}) => {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
        {open && <ListMessage conversationId={conversationId} />}
      </DialogContent>
    </Dialog>
  );
};

export default DialogPinnedMessage;

const ListMessage = ({ conversationId }: { conversationId: string }) => {
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
  if (isError) {
    return 'Error';
  }
  if (isLoading) {
    return 'Loading...';
  }
  return (
    <div className="max-h-[calc(100vh-300px)] overflow-y-auto overflow-x-hidden flex gap-5 flex-col pt-5 pb-2 px-2">
      {data?.pages.map((page) => page.data.map((message) => <MessageItem message={message} />))}
      {isFetchingNextPage && 'Loading...'}
      <div ref={ref}></div>
    </div>
  );
};

const MessageItem = ({ message }: { message: IMessage }) => (
  <>
    <div className="flex gap-3 items-end">
      <AvatarUser name={message.senderId.username?.[0]} url={message.senderId?.avatar} />
      <div className="flex-1 flex flex-col">
        <Text className="font-semibold text-xl ">{message.senderId.username}</Text>
        {message.type === 'text' ? (
          <TextMessage title={message.title!} />
        ) : (
          <ImageMessage
            imageList={message.imageList!}
            classNameWrap={
              'flex flex-wrap w-full items-stretch gap-1 overflow-y-hidden justify-start'
            }
            classNameImg="h-[100px] w-[100px]"
            classNameWrapImage="w-[100px]"
            isShowText={false}
          />
        )}
      </div>
      <Button size={'sm'} variant={'outline'} className="rounded-full">
        <Icons.moreHorizontal />
      </Button>
    </div>
    <Separator />
  </>
);
