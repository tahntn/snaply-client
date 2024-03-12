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
import LoadingComponent from '../LoadingComponent';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { DialogPinMessage } from '.';
import { Navigate } from 'react-router-dom';

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
        <div className="min-h-[300px]">
          {open && <ListMessage conversationId={conversationId} />}
        </div>
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
  const { t } = useTranslation();

  React.useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);
  if (isError) {
    return <Navigate replace to={'/conversation'} />;
  }
  if (isLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <LoadingComponent className="h-10 w-10" />
      </div>
    );
  }
  return (
    <>
      {data.pages?.[0]?.data?.length > 0 ? (
        <div className="max-h-[calc(100vh-300px)] min-h-full overflow-y-auto overflow-x-hidden flex gap-5 flex-col pt-5 pb-2 px-2">
          {data?.pages.map((page) => page.data.map((message) => <MessageItem message={message} />))}
          {isFetchingNextPage && (
            <div className="h-full w-full flex items-center justify-center mb-10">
              <LoadingComponent className="h-10 w-10" />
            </div>
          )}
          <div ref={ref}></div>
        </div>
      ) : (
        <div className="min-h-full w-full flex flex-col items-center ">
          <div className="border p-4 rounded-md border-spacing-1 mt-10 mb-6">
            <Icons.pin />
          </div>
          <h2 className="text-lg font-medium">{t('message.pin.noPinnedMessages')}</h2>
          <h4 className="text-md">{t('message.pin.pinnedMessagesPlaceholder')}</h4>
        </div>
      )}
    </>
  );
};

const MessageItem = ({ message }: { message: IMessage }) => {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <div className="flex gap-3 items-end">
        <AvatarUser name={message.senderId?.username?.[0]} url={message.senderId?.avatar} />
        <div className="flex-1 flex flex-col">
          <Text className="font-semibold text-xl ">{message.senderId?.username}</Text>
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
        <Popover>
          <PopoverTrigger asChild>
            <Button size={'sm'} variant={'outline'} className="rounded-full">
              <Icons.moreHorizontal />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-fit">
            <div className="space-y-2">
              <h4 className="font-medium leading-none cursor-pointer" onClick={() => setOpen(true)}>
                {t('message.pin.unpinMessage')}
              </h4>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <Separator />
      <DialogPinMessage
        open={open}
        setOpen={setOpen}
        isPin={true}
        conversationId={message.conversationId}
        messageId={(message.id || message._id)!}
      />
    </>
  );
};
