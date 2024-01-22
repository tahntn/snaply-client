import { useGetMe, useMessages } from '@/hooks';
import { cn } from '@/lib/utils';
import { IMessage, IMessages, IUser } from '@/types';
import { Text } from '@radix-ui/themes';
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Navigate } from 'react-router-dom';
import MessageItem from './MessageItem';
import { usePusher } from '@/context/PusherProvider';
import { useQueryClient } from '@tanstack/react-query';

interface MessageListProps {
  conversationId: string;
  currentUser: IUser;
}

const MessageList: React.FC<MessageListProps> = ({ conversationId, currentUser }) => {
  const queryClient = useQueryClient();
  const pusher = usePusher();
  const { data, isLoading, status, fetchNextPage, isError, hasNextPage, isFetchingNextPage } =
    useMessages(conversationId);
  const { ref, inView } = useInView();

  React.useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  if (!!isError) {
    return <Navigate replace to={'/conversation'} />;
  }

  React.useEffect(() => {
    if (conversationId) {
      pusher.subscribe(conversationId);

      const newMessageHandler = (data: IMessage) => {
        queryClient.setQueryData(['messages', conversationId], (oldData: any) => {
          return {
            pages: [{ data: [data] }, ...oldData.pages],
            pageParams: [...oldData.pageParams],
          };
        });
      };
      pusher.bind('message:new', newMessageHandler);
      return () => {
        pusher.unsubscribe(conversationId);
        pusher.unbind('message:new', newMessageHandler);
      };
    }
  }, [pusher, conversationId]);
  return (
    <div className="h-full max-h-full overflow-y-auto overflow-x-hidden flex-col-reverse flex gap-2 py-3 px-3">
      {data?.pages.map((page, indexPage) =>
        page.data.map((message, indexMessage) => {
          let prevMessage: IMessage;
          let hasAvatar: boolean = true;
          let isMessagesNew = true;
          if (indexMessage === page.data.length - 1) {
            prevMessage = data.pages?.[indexPage + 1]?.data?.[0];
          } else {
            prevMessage = data.pages?.[indexPage]?.data?.[indexMessage + 1];
          }
          if (
            prevMessage &&
            Math.abs(
              new Date(message.createdAt).getTime() - new Date(prevMessage.createdAt).getTime()
            ) <
              20 * 60 * 1000
          ) {
            isMessagesNew = false;
          }

          if (prevMessage && prevMessage.type == 'update') {
            isMessagesNew = false;
          }

          if (
            prevMessage &&
            prevMessage.senderId?.id === message.senderId.id &&
            prevMessage.type === message.type &&
            message.type !== 'image' &&
            !isMessagesNew
          ) {
            hasAvatar = false;
          }
          return (
            <MessageItem
              key={message.id}
              {...message}
              currentUser={currentUser}
              hasAvatar={hasAvatar}
              isMessagesNew={isMessagesNew}
            />
          );
        })
      )}

      <div ref={ref} style={{ height: '20px' }} />
    </div>
  );
};

export default MessageList;
