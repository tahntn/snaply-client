import { useGetMe, useMessages } from '@/hooks';
import { cn } from '@/lib/utils';
import { IUser } from '@/types';
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
    <div className="h-[calc(100vh-210px)] overflow-y-auto overflow-x-hidden flex-col-reverse flex gap-5 py-3 px-4">
      {data?.pages.map((page) =>
        page.data.map((message) => <MessageItem {...message} currentUser={currentUser} />)
      )}
      <div ref={ref} style={{ height: '20px' }} />
    </div>
  );
};

export default MessageList;
