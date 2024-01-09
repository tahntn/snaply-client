import { useGetMe, useMessages } from '@/hooks';
import { cn } from '@/lib/utils';
import { IUser } from '@/types';
import { Text } from '@radix-ui/themes';
import React from 'react';
import { useInView } from 'react-intersection-observer';

interface MessageListProps {
  conversationId: string;
  currentUser: IUser | undefined;
}

const MessageList: React.FC<MessageListProps> = ({ conversationId, currentUser }) => {
  const { data, isLoading, status, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useMessages(conversationId);
  const { ref, inView } = useInView();

  React.useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);
  return (
    <div className="h-[calc(100vh-200px)] overflow-y-auto flex-col-reverse flex gap-5 py-3 px-4">
      {data?.pages.map((page: any) =>
        page.data.map((message: any) => (
          <div
            className={cn(
              'w-full flex',
              currentUser?.id === message?.senderId?.id && 'justify-end'
            )}
          >
            <div
              className={cn(
                'bg-slate-50 py-3 w-fit px-3 rounded-md text-xl',
                currentUser?.id === message?.senderId?.id && 'text-right'
              )}
            >
              <Text className={cn()}>{message.title}</Text>
            </div>
          </div>
        ))
      )}
      <div ref={ref} style={{ height: '20px' }} />
    </div>
  );
};

export default MessageList;
