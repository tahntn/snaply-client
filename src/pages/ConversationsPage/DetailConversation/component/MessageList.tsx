import { useGetMe, useMessages } from '@/hooks';
import { cn } from '@/lib/utils';
import { IMessage, IUser } from '@/types';
import { Text } from '@radix-ui/themes';
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Navigate } from 'react-router-dom';
import MessageItem from './MessageItem';

interface MessageListProps {
  conversationId: string;
  currentUser: IUser;
}

const MessageList: React.FC<MessageListProps> = ({ conversationId, currentUser }) => {
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
  return (
    <div className="h-full overflow-y-auto overflow-x-hidden flex-col-reverse flex gap-2 py-3 px-3">
      {data?.pages.map((page, indexPage) =>
        page.data.map((message, indexMessage) => {
          let prevMessage: IMessage;
          let hasAvatar: boolean = true;
          if (indexMessage === 9) {
            prevMessage = data.pages?.[indexPage + 1]?.data?.[0];
          } else {
            prevMessage = data.pages?.[indexPage]?.data?.[indexMessage + 1];
          }

          if (
            prevMessage &&
            prevMessage.senderId?.id === message.senderId.id &&
            prevMessage.type === message.type &&
            Math.abs(
              new Date(message.createdAt).getTime() - new Date(prevMessage.createdAt).getTime()
            ) <
              20 * 60 * 1000
          ) {
            hasAvatar = false;
          }

          return (
            <MessageItem
              key={message.id}
              {...message}
              currentUser={currentUser}
              hasAvatar={hasAvatar}
            />
          );
        })
      )}

      <div ref={ref} style={{ height: '20px' }} />
    </div>
  );
};

export default MessageList;
