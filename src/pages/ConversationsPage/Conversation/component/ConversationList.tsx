import React from 'react';
import { Box, Text } from '@radix-ui/themes';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import { useQueryClient } from '@tanstack/react-query';
import ChatElement from './ChatElement';
import { useConversations, useGetMe } from '@/hooks';
import { usePusher } from '@/context/PusherProvider';
import { IDetailConversation } from '@/types';

const ConversationList = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const pusher = usePusher();
  const { data: currentUser } = useGetMe();
  const { ref, inView } = useInView();

  const { data, isLoading, status, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useConversations();

  React.useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  let count = 0;

  React.useEffect(() => {
    console.log('a');
    if (currentUser?.id) {
      pusher.subscribe(currentUser?.id);

      const newConversationHandler = (newConversation: IDetailConversation) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        queryClient.setQueryData(['conversation'], (prev: any) => {
          return {
            pages: [{ data: [newConversation] }, ...prev.pages],
            pageParams: [...prev.pageParams],
          };
        });
      };

      if (!count) {
        pusher.bind('conversation:new', newConversationHandler);
        count++;
      }

      return () => {
        pusher.unsubscribe(currentUser.id!);
        pusher.unbind('message:new', newConversationHandler);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser?.id]);

  if (status === 'loading' || isLoading) {
    return <p>Loading...</p>;
  }

  if (status === 'error') {
    return <p>Error</p>;
  }
  return (
    <Box className="flex gap-5 pb-5 flex-col overflow-y-auto max-h-[750px] pr-4 overflow-x-hidden">
      <Text className="text-lg font-semibold">{t('conversation.allConversation')}</Text>
      {data &&
        data.pages?.map((listConversation) =>
          listConversation?.data?.map((conversation) => <ChatElement conversation={conversation} />)
        )}
      <div ref={ref} style={{ height: '20px' }} />
    </Box>
  );
};

export default ConversationList;
